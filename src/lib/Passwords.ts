import bcrypt from 'bcrypt';

const createPass = async(plain: string, saltRounds?: number): Promise<string> =>
{
    let salt = await bcrypt.genSalt(saltRounds ?? 16);
    let hash = await bcrypt.hash(plain, salt);
    return hash;
};
const checkPass = async(plain: string, hash: string): Promise<boolean> => await bcrypt.compare(plain, hash);

export { createPass, checkPass };