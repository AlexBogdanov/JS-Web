module.exports = {
    success: (msg) => {
        document.getElementById('infoBoxSuccess').textContent(msg);
        
        $('#infoBox>span').text(msg);
        $('#infoBox').show();
        $('#infoBox').fadeOut(3000);
        $('#infoBox').on('click', () => {
            $('#infoBox').fadeOut(1);
        });
    },

    error: (msg) => {
        $('#errorBox>span').text(msg);
        $('#errorBox').show();
        $('#errorBox').on('click', () => {
            $('#errorBox').fadeOut(1);
        });
    }
}