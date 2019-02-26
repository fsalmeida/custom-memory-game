module.exports = {
    new: function () {
        let timer = {
            ellapsed: 0,
            startTime: null,
            start: () => {
                this.startTime = new Date();
                this.ellapsed = 0;

                this.timerInterval = setInterval(() => {
                    this.ellapsed = Date.now() - this.startTime;
                }, 1000);
            },
            stop: () => {
                clearInterval(this.timerInterval);
            }
        };

        return timer;
    }
};