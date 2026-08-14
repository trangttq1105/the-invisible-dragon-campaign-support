const currentCampaign = campaigns.specialEP;


function renderReleaseBox(campaign) {

    const box = document.getElementById("release-box");

    const target = new Date(campaign.startTime);
    const now = new Date();

    const timeString = target.toLocaleTimeString(
        "en-US",
        {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        }
    );

    const dateString = target.toLocaleDateString(
        "en-GB",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );

    if (now < target) {

        box.innerHTML = `
            <h3>
                Trending for ${campaign.title} will start at
            </h3>

            <p>
                ${timeString} ${dateString} (Thai time)
            </p>

            <p>
                Start time in your location is:
            </p>

            <p id="local-time"></p>
        `;

        renderLocalTime(target);

    } else {

        box.innerHTML = `
            <h3>
                Trending for
                <strong>${campaign.title}</strong>
                has started
            </h3>

            <p class="small-note">
                Check WHAT TO DO below
            </p>
        `;
    }
}


function renderLocalTime(target) {

    const localTime = target.toLocaleString(
        undefined,
        {
            dateStyle: "short",
            timeStyle: "short"
        }
    );

    document.getElementById("local-time")
        .textContent = localTime;
}


renderReleaseBox(currentCampaign);

function renderCountdown(campaign) {

    const box = document.getElementById("countdown-box");

    const target = new Date(campaign.startTime);

    function update() {

        const result = getTimeRemaining(
            campaign.startTime
        );

        if (!result.expired) {

            box.innerHTML = `
                <h3>Countdown:</h3>

                <div class="countdown">
                    ${result.days} Days
                    ${result.hours} Hours
                    ${result.minutes} Minutes
                    ${result.seconds} Seconds
                </div>
            `;

        } else {

            const trackingEnd =
                new Date(target.getTime() + 24 * 60 * 60 * 1000);

            const remaining =
                trackingEnd - new Date();

            if (remaining > 0) {

                const totalSeconds =
                    Math.floor(remaining / 1000);

                const days =
                    Math.floor(totalSeconds / 86400);

                const hours =
                    Math.floor(
                        (totalSeconds % 86400) / 3600
                    );

                const minutes =
                    Math.floor(
                        (totalSeconds % 3600) / 60
                    );

                const seconds =
                    totalSeconds % 60;

                box.innerHTML = `
                    <h3>24hours tracking time:</h3>

                    <div class="countdown">
                        ${days} Days
                        ${hours} Hours
                        ${minutes} Minutes
                        ${seconds} Seconds
                    </div>
                `;

            } else {

                box.innerHTML = `
                    <h3>24hours tracking time:</h3>

                    <div class="countdown">
                        0 Days
                        0 Hours
                        0 Minutes
                        0 Seconds
                    </div>

                    <p class="thank-you">
                        ${campaign.endMessage}
                    </p>
                `;
            }
        }
    }

    update();

    setInterval(update, 1000);

    function renderEPActionBox(campaign) {

    const box = document.getElementById("action-box");

    const target = new Date(campaign.startTime);
    const now = new Date();

    if (now < target) {

        box.innerHTML = `
            <div class="action-columns">

                <div class="action-column">

                    <h3>STREAMING</h3>

                    <p class="small-note">
                        Please support official links only
                    </p>

                </div>


                <div class="action-column">

                    <h3>TRENDING</h3>

                    <a
                        href="${campaign.trendingLink}"
                        target="_blank"
                        class="action-button"
                    >
                        TRENDING
                    </a>

                </div>

            </div>
        `;

    } else {

        let streamingHTML = `
            <h3>STREAMING</h3>

            <p class="small-note">
                Please support official links only
            </p>
        `;


        campaign.parts.forEach(part => {

            streamingHTML += `
                <a
                    href="${part.url}"
                    target="_blank"
                    class="action-button"
                >
                    ${part.name}

                    <span class="small-note">
                        ${part.instruction}
                    </span>
                </a>
            `;

        });


        box.innerHTML = `
            <div class="action-columns">

                <div class="action-column">

                    ${streamingHTML}

                </div>


                <div class="action-column">

                    <h3>TRENDING</h3>

                    <div class="info-button">
                        Hashtag: ${campaign.hashtag}
                    </div>


                    <a
                        href="${campaign.clickToPost}"
                        target="_blank"
                        class="action-button"
                    >
                        Click to post
                    </a>


                    <a
                        href="${campaign.trendingList}"
                        target="_blank"
                        class="action-button"
                    >
                        Trending list
                    </a>

                </div>

            </div>
        `;
    }
        function renderEPTracking(campaign) {

    const box =
        document.getElementById("tracking-box");

    box.innerHTML = `
        <h3>TRENDING</h3>

        <h4>HOW TO TREND</h4>

        <p>
            <a
                href="${campaign.clickToPost}"
                target="_blank"
            >
                Click to post
            </a>
        </p>


        <p>
            <a
                href="${campaign.trendingList}"
                target="_blank"
            >
                Trending list
            </a>
        </p>


        <div class="tracking-row">

            <span>Location</span>

            <strong>
                ${campaign.tracking.location}
            </strong>

        </div>


        <div class="tracking-row">

            <span>#1 Location</span>

            <strong>
                ${campaign.tracking.numberOneLocation}
            </strong>

        </div>
    `;

            renderReleaseBox(currentCampaign);

renderCountdown(currentCampaign);

renderEPActionBox(currentCampaign);

renderEPTracking(currentCampaign);
}
}
}
