function getTimeRemaining(startTime) {

    const now = new Date();
    const target = new Date(startTime);

    const difference = target - now;

    if (difference <= 0) {
        return {
            expired: true,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };
    }

    const totalSeconds = Math.floor(difference / 1000);

    const days = Math.floor(totalSeconds / 86400);

    const hours = Math.floor(
        (totalSeconds % 86400) / 3600
    );

    const minutes = Math.floor(
        (totalSeconds % 3600) / 60
    );

    const seconds = totalSeconds % 60;

    return {
        expired: false,
        days,
        hours,
        minutes,
        seconds
    };
}
