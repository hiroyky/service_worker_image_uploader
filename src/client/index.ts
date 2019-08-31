import axios from "axios";

if (navigator.serviceWorker !== undefined) {
    window.addEventListener("load", async () => {
        try {
            const registration = await navigator.serviceWorker.register("/serviceworker.js");
            console.log("serviceworkerの登録完了", registration);

        } catch (err) {

            console.error(err);
        }
    });
}

window.addEventListener("load", () => {
    const uploadButton = document.getElementById("uploadButton");
    if (uploadButton) {
        uploadButton.addEventListener("click", upload);
    }
});

function upload(event: Event) {
    const uploadElement = document.getElementById("uploadImage") as HTMLInputElement;
    if (uploadElement.files === null) {
        return false;
    }

    const formData = new FormData();
    formData.append("upload_image", uploadElement.files[0]);

    axios.post("/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}
