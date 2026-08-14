
function renderReleaseBox(campaign) {

    const box = document.getElementById("release-box");
  const currentCampaign = campaigns.specialEP;

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
