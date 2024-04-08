import crypto from 'crypto';

class PasswordCrypt {
    generateSalt() {
        return crypto.randomBytes(8).toString('hex');
    }

    createHash(password: string, salt?: string) {
        salt ??= this.generateSalt()
        return crypto.pbkdf2Sync(password, salt,
            1000, 24, `sha512`).toString(`hex`) + '.' + salt;
    }

    validatePassword(password: string, hashPassword: string) {
        try {
            const [, salt] = hashPassword.split('.');
            return this.createHash(password, salt) === hashPassword;
        } catch (error: any) {
            console.error(error)
        }

    }

}

export default new PasswordCrypt()