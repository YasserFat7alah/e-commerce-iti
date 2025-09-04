import View from "../../components/core/view.js";
import { renderUsers } from "../../components/dashboard/admin-users.js";

export default class UsersPage extends View {
    template() {
        return `<div id="usersPageContainer"></div>`;
    }

    script() {
        const user = document.getElementById("usersPageContainer")
        renderUsers(user);
        
    }

}