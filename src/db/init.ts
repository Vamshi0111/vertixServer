import Customer from "./models/customers";
import User from "./models/user";

async function init() {
    const isDev = false;
    await Customer.sync({ alter: isDev });
    await User.sync({ alter: isDev });
}

function dbInit() {
    init()
}
export default dbInit;
