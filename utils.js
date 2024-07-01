class Utils{
    static validateText(text){
        return !text || (text ?? '').trim() === '';
    }
    static validatePassword(password){
        return !password || (password ?? '').trim() === '' || (password ?? '').trim().length < 8;
    }
}

module.exports = Utils;