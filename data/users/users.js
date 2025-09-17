import { toUser } from "../../scripts/utils/data.js";


const data = [
    {
        id: 'MasterY',
        name: "Yasser",
        email: "yasser@example.com",
        password: "123456",
        role: "admin",
        phone: '01008348640',
        status: "active", // Status
        joinDate: new Date("Aug 03, 2025") // Join Date
    },

    {
        id: 'AdminA',
        name: "Ahmed Osama",
        email: "osama@example.com",
        password: "123456",
        role: "admin",
        phone: '01001234545',
        status: "active", // Status
        joinDate: new Date("Aug 01, 2024") // Join Date
    },

    {
        id: 'CustAz1',
        name: "Azza",
        email: "azza@example.com",
        password: "123456",
        role: "customer",
        phone: '01012412753',
        status: "active", // Status
        joinDate: new Date("Aug 01, 2025") // Join Date


    },
    {
        id: 'SellM1',
        name: "Mariam",
        email: "mariam@example.com",
        password: "123456",
        role: "seller",
        phone: '01005675670',
        status: "active", // Status
        joinDate: new Date("Aug 01, 2025") // Join Date
    },
    {
        id: "SellBelt2",
        name: "Ahmed Beltagy",
        email: "beltagy@example.com",
        password: "123456",
        role: "seller",
        phone: '01001231230',
        status: "active", // Status
        joinDate: new Date("Aug 01, 2025") // Join Date
    },
    {
        id: "SellMoh3",
        name: "Mohamed Ahmed",
        email: "MohAhmed@example.com",
        password: "123456",
        role: "seller", 
        phone: '010012312330',
        status: "active", // Status
        joinDate: new Date("Aug 21, 2025") // Join Date
    },
    {
        id: "SellAdel4",
        name: "Adel Ahmed",
        email: "adelAhmed@example.com",
        password: "123456",
        role: "seller",
        phone: '012212312340',
        status: "active", // Status
        joinDate: new Date("Aug 21, 2023") // Join Date
    },
    {
        id: "SellAzza5",
        name: "Azza Sallam",
        email: "azzasallam@example.com",
        password: "123456",
        role: "seller",
        phone: '010012992335',
        status: "active", // Status
        joinDate: new Date("Aug 25, 2025") // Join Date
    },

];

export const users = [];

for (let i = 0; i < data.length; i++) { users[i] = toUser(data[i]) }


