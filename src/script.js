import "./firstblock/styles.scss";

import $ from "jquery";

$(function () {
    $(document).on("click", ".wp-block-custom-blocks-firstblock", () => {
        alert("teste");
    });
});
