const User = require('./../models/User');
const Project = require('./../models/Project');
const Team = require('./../models/Team');

module.exports = {
    getCreateProject: (req, res) => {
        res.render('project/create');
    },

    postCreateProject: (req, res) => {
        const projectArgs = req.body;

        const project = new Project({
            name: projectArgs.name,
            description: projectArgs.description
        });

        Project.create(project)
            .then(() => {
                console.log(`Project ${projectArgs.name} successfully created`);
                res.redirect('/project/all');
            }).catch(console.log);
    },

    getProjects: async (req, res) => {
        try {
            const user = await User.findById(req.user._id.toString());
            const teams = await Team.find({ });

            teams.forEach(team => {
                team.id = team._id.toString();
            })

            const projects = await Project.find({ team:  { $eq: null } });

            projects.forEach(project => {
                project.id = project._id.toString();
            })

            const allProjects = await Project.find({ })
                .populate('team');
            allProjects.forEach(project => {
                project.hasTeam = project.team ? true : false;
            });

            const isAdmin = user.roles.includes('Admin') ? true : false;
            const notSearched = true;
    
            res.render('project/all', { isAdmin, teams, projects, allProjects, notSearched });
        } catch (err) {
            console.log(err);
        }
    },

    postProjectsAdmin: async (req, res) => {
        try {
            const team = await Team.findById(req.body.teamId);
            const project = await Project.findById(req.body.projectId);

            project.team = team._id;
            team.project.push(project._id);

            await team.save();
            await project.save();

            res.redirect('/project/all');
        } catch (err) {
            console.log(err);
        }
    },

    postProjectUser: async (req, res) => {
        try {
            const projects = await Project.find({ })
                .populate('team');
            const filteredProjects = projects.filter(project => project.name.toLowerCase() === req.body.searchVal.toLowerCase());
            filteredProjects.forEach(project => {
                project.hasTeam = project.team ? true : false;
            })
            const notSearched = false;
            const showProjects = filteredProjects.length > 0 ? true : false;
            const name = req.body.searchVal;

            res.render('project/all', { notSearched, filteredProjects, showProjects, name });
        } catch (err) {
            console.log(err);
        }
    }
}