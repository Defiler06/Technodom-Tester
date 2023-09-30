export const formatedPhoneNumber = (phone: string) => {
    if (!phone) return phone;

    const phoneNumber = phone.replace(/[^\d]/g, '');
    const withPlusSeven = phoneNumber.startsWith('7');
    if (withPlusSeven) {
        return `+7 ${phoneNumber.slice(1, 4)} ${phoneNumber.slice(4, 7)} ${phoneNumber.slice(7, 9)} ${phoneNumber.slice(9, 11)}`;
    } else {
        return `+7 ${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6, 8)} ${phoneNumber.slice(8, 10)}`;
    }
};