var media = {
    queue: [],
    my_media: null,
    my_rec: null,
    mediaTimer: null,
    currentPlayingMedia:null,
    playAudio: function(song) {
        
        if (media.my_media) {
            media.stopAudio();
        }
        if (song.duration) {
            media.my_media = new Media(song.path, media.onSuccess, media.onError, media.mediaStatusFunction);

            media.my_media.play();
            /*var src = "recording.mp3";
            my_rec = new Media(src, mySuccess, myError);
            my_rec.startRecord();

            my_media.play({numberOfLoops: 2});
            my_media.play({playAudioWhenScreenIsLocked: true});

            currentMediaInfo.totalDuration = totaltime;*/
        }
    },
    resumeAudio: function() {
        if (my_media) {
            media.my_media.play();
        }
    },
    stopAudio: function() {
        if (media.my_media) {
            media.my_media.stop();
        }
        /*my_rec.stopRecord();
        clearInterval(mediaTimer);
        mediaTimer = null;
        setStoppedButton*/
    },
    onSuccess: function() {
        console.log("playAudio():Audio Success");
        my_rec.stopRecord();
        stopTracker();
        setStoppedButton();
    },
    onError: function(error) {
        alert('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
    },
    mySuccess: function() {
        console.log("playAudio():Audio Success");

    },
    myError: function(error) {
        alert('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
    },
    mediaStatusFunction: function(status) {

    }
};