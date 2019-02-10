const User = require('./../models/User');
const Team = require('./../models/Team');

module.exports = {
    getCreateTeam: (req, res) => {
        res.render('team/create');
    },

    postCreateTeam: (req, res) => {
        const team = new Team({
            name: req.body.name
        });

        Team.create(team)
            .then(() => {
                console.log(`Team ${req.body.name} successfully created`);
                res.redirect('/team/all');
            })
            .catch(console.log);
    },

    getTeams: async (req, res) => {
        try {
            const user = await User.findById(req.user._id.toString());
            const users = await User.find({ });

            users.forEach(user => {
                user.id = user._id.toString();
            });

            const teams = await Team.find({ })
                .populate('project')
                .populate('members');

            teams.forEach(team => {
                team.hasMembers = team.members.length > 0 ? true : false;
                team.hasProjects = team.project.length > 0 ? true : false;
                team.id = team._id.toString();
            });

            const isAdmin = user.roles.includes('Admin') ? true : false;
            const notSearched = true;

            res.render('team/all', { isAdmin, users, teams, notSearched })
        } catch (err) {
            console.log(err);
        }
    },

    postTeamsAdmin: async (req, res) => {
        try {
            const user = await User.findById(req.body.userId);
            const team = await Team.findById(req.body.teamId);

            const teamMembers = team.members.map(member => member.toString());
            const userTeams = user.teams.map(team => team.toString());

            if (teamMembers.includes(user._id.toString()) || userTeams.includes(team._id.toString())) {
                console.log('Member already in team');
                res.redirect('/team/all');
                return;
            }

            team.members.push(user._id);
            user.teams.push(team._id);

            await team.save();
            await user.save();
            
            res.redirect('/team/all');
        } catch (err) {
            console.log(err);
        }
    },

    postTeamUser: async (req, res) => {
        try {
            const teams = await Team.find({ })
                .populate('project')
                .populate('members');
            const filteredTeams = teams.filter(team => team.name.toLowerCase() === req.body.searchVal.toLowerCase());
            filteredTeams.forEach(team => {
                team.hasMembers = team.members.length > 0 ? true : false;
                team.hasProjects = team.project.length > 0 ? true : false;
            })

            const notSearched = false;
            const showTeams = filteredTeams.length > 0 ? true : false;
            const name = req.body.searchVal;

            res.render('team/all', { filteredTeams, notSearched, showTeams, name });
        } catch (err) {
            console.log(err);
        }
    },

    leaveTeam: async (req, res) => {
        try {
            const team = await Team.findById(req.params.teamId);
            const userId = req.user._id.toString();
            const user = await User.findById(userId);

            teamMembers = team.members.map(member => member.toString());
            
            if (teamMembers.includes(userId)) {
                const userIndex = teamMembers.indexOf(userId);
                team.members.splice(userIndex, 1);
                const teamIndex = user.teams.indexOf(team._id);
                user.teams.splice(teamIndex, 1);

                await team.save();
                await user.save();
            }

            res.redirect(`/profile/${userId}`);
        } catch (err) {
            console.log(err);
        }
    }
}