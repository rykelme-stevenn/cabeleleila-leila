export const validateEmail = (email: string) => {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return re.test(email) || 'E-mail inválido';
};
