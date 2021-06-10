export const getReso = (width, height) => {
	switch (`${width}x${height}`) {
		case '4032x3024':
			return 'DCI 4K (iCAM 12MP)';
		case '3840x2160':
			return '4K (iCAM 12MP)';
		case '4096x2160':
			return 'DCI 4K';
		case '3840x2160':
			return '4K';
		case '2048x1152':
			return '2K';
		case '1920x1080':
			return 'Full HD';
		case '1280x720':
			return 'HD';
		case '640x480':
			return 'SD';
		default:
			switch (width) {
				case 4032:
					return 'DCI 4K';
				case 3840:
					return '4K';
				case 2048:
					return '2K';
				case 1920:
					return 'Full HD';
				case 1280:
					return 'HD';
				case 640:
					return 'HD';
				default:
					return 'Non SD';
			}
	}
};

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
        let reso = '';
        if (navigator.platform.indexOf('Mac') > -1) {
            try {
                // DCI 4K - iCam 12 MP
                reso = 'DCI 4K';
                const constraints = {
                    width: { ideal: 4032 },
                    height: { ideal: 3024 },
                };
                await videoTrack.applyConstraints(constraints);
            } catch (e) {
                try {
                    // UHD - iCam 8 MP
                    reso = 'DCI 4K';
                    const constraints = {
                        width: { ideal: 3840 },
                        height: { ideal: 2160 },
                    };
                    await videoTrack.applyConstraints(constraints);
                } catch (e) {
                    try {
                        // UHD - iCam 8 MP
                        reso = 'DCI 4K';
                        const constraints = {
                            width: { ideal: 3840 },
                            height: { ideal: 2160 },
                        };
                        await videoTrack.applyConstraints(constraints);
                    } catch (e) {
                        try {
                            // Full HD
                            reso = 'Full HD';
                            const constraints = {
                                width: { ideal: 1920 },
                                height: { ideal: 1080 },
                            };
                            await videoTrack.applyConstraints(constraints);
                        } catch (e) {
                            try {
                                // HD
                                reso = 'HD';

                                const constraints = {
                                    width: { ideal: 1280 },
                                    height: { ideal: 720 },
                                };
                                await videoTrack.applyConstraints(constraints);
                            } catch (e) {
                                try {
                                    // HD
                                    reso = 'SD';
                                    const constraints = {
                                        width: { ideal: 640 },
                                        height: { ideal: 480 },
                                    };
                                    await videoTrack.applyConstraints(constraints);
                                } catch (e) {
                                    alert(e);
                                }
                            }
                        }
                    }
                }
            }
        } else {
            try {
                // DCI 4K
                reso = 'DCI 4K';
                const constraints = {
                    width: { ideal: 4096 },
                    height: { ideal: 2160 },
                };
                await videoTrack.applyConstraints(constraints);
            } catch (e) {
                try {
                    // UHD
                    reso = 'UHD';
                    const constraints = {
                        width: { ideal: 3840 },
                        height: { ideal: 2160 },
                    };
                    await videoTrack.applyConstraints(constraints);
                } catch (e) {
                    try {
                        // 2K
                        reso = '2K';
                        const constraints = {
                            width: { ideal: 2048 },
                            height: { ideal: 1152 },
                        };
                        await videoTrack.applyConstraints(constraints);
                    } catch (e) {
                        try {
                            // Full HD
                            reso = 'Full HD';
                            const constraints = {
                                width: { ideal: 1920 },
                                height: { ideal: 1080 },
                            };
                            await videoTrack.applyConstraints(constraints);
                        } catch (e) {
                            try {
                                // HD
                                reso = 'HD';

                                const constraints = {
                                    width: { ideal: 1280 },
                                    height: { ideal: 720 },
                                };
                                await videoTrack.applyConstraints(constraints);
                            } catch (e) {
                                try {
                                    // HD
                                    reso = 'SD';
                                    const constraints = {
                                        width: { ideal: 640 },
                                        height: { ideal: 480 },
                                    };
                                    await videoTrack.applyConstraints(constraints);
                                } catch (e) {
                                    alert(e);
                                }
                            }
                        }
                    }
                }
            }
        }
        const updatedSettings = videoTrack.getSettings();
        updatedSettings.reso = reso;
        return { stream, settings: updatedSettings, reso: reso };
        /* use the stream */
    } catch (err) {
        console.error(err);
        /* handle the error */
    }
}
