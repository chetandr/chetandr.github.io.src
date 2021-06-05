export async function getMedia() {
    let stream = null;

    try {
        try {
            stream = await navigator.mediaDevices.getUserMedia({
                audio: false,
                video: { facingMode: { exact: 'environment' } },
            });
        } catch (err) {
            stream = await navigator.mediaDevices.getUserMedia({
                audio: false,
                video: { facingMode: { exact: 'user' } },
            });
        }

        const videoTracks = await stream.getVideoTracks();
        const videoTrack = videoTracks[0];
        const capabilities = videoTracks[0].getCapabilities();
        const settings = videoTrack.getSettings();
        console.log(capabilities, settings);
        const constraints = {
            width: { exact: capabilities.width.max },
            height: { exact: capabilities.height.max },
        };
        videoTrack.applyConstraints(constraints);
        const updatedSettings = videoTrack.getSettings();
        return { stream, settings: updatedSettings };
        /* use the stream */
    } catch (err) {
        console.error(err);
        /* handle the error */
    }
}