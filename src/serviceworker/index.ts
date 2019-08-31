export default null;
declare var self: ServiceWorkerGlobalScope;

import Jimp from "jimp";

self.addEventListener("install", (event) => {
    console.log("install event");
    event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
    console.log("activate event");
    event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
    console.log("fetch event");
});

self.addEventListener("message", (event) => {
    console.log("message event");
});

self.addEventListener("sync", (event) => {
    console.log("sync event");
});

self.addEventListener("push", (event) => {
    console.log("push event");
});

self.addEventListener("fetch", (event) => {
    console.log("fetch event");

    const req: Request = event.request;
    const path = new URL(req.url).pathname;

    if (path === "/upload" && req.method === "POST") {

        console.log("POST /upload");

        event.respondWith(async function() {
            try {
                const formData = await req.formData();
                const file = formData.get("upload_image") as File | null;

                console.log(file);

                if (file === null) {
                    console.log("file is null");
                    return;
                }

                const data = await readFile(file) as ArrayBuffer;
                const image = await Jimp.read(Buffer.from(data));
                const dstImageBuffer = await image.scaleToFit(200, 200).getBufferAsync(image.getMIME());
                const dstImageArrayBuffer = bufferToArrayBuffer(dstImageBuffer);
                const dstImageBlob = new Blob([dstImageArrayBuffer]);

                const dstFormData = new FormData();
                dstFormData.append("hello", "world");
                dstFormData.append("upload_image", dstImageBlob);

                console.log("begin fetch");

                const res = await fetch("/upload", {
                    method: "POST",
                    body: dstFormData,
                });

                console.log(res);
                return res;

            } catch (err) {
                console.log(err);
                return err;
            }

        }());

    }
});

function readFile(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            resolve(reader.result);
        };
        reader.readAsArrayBuffer(file);
    });
}

function bufferToArrayBuffer(buf: Buffer): ArrayBuffer {
    const ab = new ArrayBuffer(buf.length);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return ab;
}
