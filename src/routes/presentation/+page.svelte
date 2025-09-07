<script>
    import profilePicture from '$lib/assets/profile-picture.jpg'
    import MingcuteMapPinFill from '~icons/mingcute/map-pin-fill';
</script>

<div class="preset-content-width mt-8">
    <div class="flex flex-row gap-x-4">
        <div class="m-6">
            <h1 class="h1">Hello, I am Paul MATHIEU</h1>
            <div class="flex align-middle mt-4">
                <MingcuteMapPinFill class="w-8 h-8 text-red-500"/>
                <span class="inline-block text-2xl ml-4">Nice, France</span>
            </div>
            <div class="flex gap-4 mt-4">
                <span class="badge bg-gradient-to-br variant-gradient-primary-secondary">Full-stack Developer</span>
                <span class="badge bg-gradient-to-br variant-gradient-primary-secondary">9 years of experience</span>
                <span class="badge bg-gradient-to-br variant-gradient-primary-secondary">Free-Lance</span>
            </div>
        </div>

        <div class="relative inline-block mr-2">
            <img
                    src={profilePicture}
                    alt="Paul MATHIEU"
                    class="w-64 h-64 object-cover rotate-6 hover:-rotate-6 transition-transform duration-300 shadow-xl rounded-xl border-4 border-primary-500"
            />
        </div>
    </div>

    <p class="preset-nice-paragraph">Web development engineer with 9 years of experience, I have supported major players
        such as Airbus
        Helicopters, Air France, EDF, and Crédit Agricole on a wide range of projects, working as a Full-Stack
        Developer,
        Tech Lead, and Scrum Master. Calm, patient, and thoughtful, I leverage my analytical skills to deliver
        effective,
        tailored solutions while fostering a constructive and collaborative work environment. Passionate about
        technology,
        but also about travel, sports, and nature, I enjoy taking on new challenges—both in my professional projects and
        through outdoor activities such as trail running, climbing, ski touring, and mountaineering. My expertise,
        particularly in front-end development and the design of modern interfaces, is backed by strong adaptability and
        a
        proactive mindset, enabling me to successfully drive IT projects from start to finish.</p>
    <p class="preset-nice-paragraph">
        In my free time, I enjoy reading, cooking, and playing board games with friends. Sports also play a big part in
        my life — I’m passionate about outdoor activities like hiking, trail running, and ski touring, as well as more
        demanding pursuits such as rock climbing and alpinism. I also love team sports, especially volleyball and
        ultimate frisbee. Beyond sports, traveling is another passion of mine. I enjoy discovering new cultures and
        cuisines, and I’ve been fortunate to spend a year as an exchange student in Colorado (USA), take a 4-month
        journey through Asia, and embark on a 10-month adventure across South America.
    </p>
</div>
