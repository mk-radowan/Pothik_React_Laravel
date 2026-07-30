const BANGLADESH_DIVISIONS = [
    "Dhaka",
    "Barisal",
    "Chattogram",
    "Khulna",
    "Mymensingh",
    "Rajshahi",
    "Rangpur",
    "Sylhet",
];

const BANGLADESH_LOCATION_DATA = [
    {
        name: "Dhaka",
        bn_name: "ঢাকা",
        districts: [
            {
                name: "Dhaka",
                bn_name: "ঢাকা",
                upazilas: [
                    { name: "Dhaka North", bn_name: "ঢাকা উত্তর" },
                    { name: "Dhaka South", bn_name: "ঢাকা দক্ষিণ" },
                ],
            },
            {
                name: "Faridpur",
                bn_name: "ফরিদপুর",
                upazilas: [
                    { name: "Boalmari", bn_name: "বোয়ালমারী" },
                    { name: "Faridpur Sadar", bn_name: "ফরিদপুর সদর" },
                ],
            },
            {
                name: "Gazipur",
                bn_name: "গাজীপুর",
                upazilas: [
                    { name: "Gazipur Sadar", bn_name: "গাজীপুর সদর" },
                    { name: "Kapasia", bn_name: "কাপাসিয়া" },
                ],
            },
            {
                name: "Gopalganj",
                bn_name: "গোপালগঞ্জ",
                upazilas: [
                    { name: "Gopalganj Sadar", bn_name: "গোপালগঞ্জ সদর" },
                    { name: "Kotalipara", bn_name: "কোটালিপাড়া" },
                ],
            },
            {
                name: "Jamalpur",
                bn_name: "জামালপুর",
                upazilas: [
                    { name: "Jamalpur Sadar", bn_name: "জামালপুর সদর" },
                    { name: "Madarganj", bn_name: "মদারগঞ্জ" },
                ],
            },
            {
                name: "Kishoreganj",
                bn_name: "কিশোরগঞ্জ",
                upazilas: [
                    { name: "Kishoreganj Sadar", bn_name: "কিশোরগঞ্জ সদর" },
                    { name: "Hossainpur", bn_name: "হোসেনপুর" },
                ],
            },
            {
                name: "Madaripur",
                bn_name: "মাদারীপুর",
                upazilas: [
                    { name: "Madaripur Sadar", bn_name: "মাদারীপুর সদর" },
                    { name: "Rajoir", bn_name: "রাজৈর" },
                ],
            },
            {
                name: "Manikganj",
                bn_name: "মানিকগঞ্জ",
                upazilas: [
                    { name: "Manikganj Sadar", bn_name: "মানিকগঞ্জ সদর" },
                    { name: "Shivalaya", bn_name: "শিবালয়" },
                ],
            },
            {
                name: "Munshiganj",
                bn_name: "মুন্সীগঞ্জ",
                upazilas: [
                    { name: "Munshiganj Sadar", bn_name: "মুন্সীগঞ্জ সদর" },
                    { name: "Sirajdikhan", bn_name: "সিরাজদিখান" },
                ],
            },
            {
                name: "Mymensingh",
                bn_name: "ময়মনসিংহ",
                upazilas: [
                    { name: "Mymensingh Sadar", bn_name: "ময়মনসিংহ সদর" },
                    { name: "Bhaluka", bn_name: "ভালুকা" },
                ],
            },
            {
                name: "Narayanganj",
                bn_name: "নারায়ণগঞ্জ",
                upazilas: [
                    { name: "Narayanganj Sadar", bn_name: "নারায়ণগঞ্জ সদর" },
                    { name: "Bandar", bn_name: "বন্দর" },
                ],
            },
            {
                name: "Narsingdi",
                bn_name: "নরসিংদী",
                upazilas: [
                    { name: "Narsingdi Sadar", bn_name: "নরসিংদী সদর" },
                    { name: "Palash", bn_name: "পলাশ" },
                ],
            },
            {
                name: "Netrokona",
                bn_name: "নেত্রকোণা",
                upazilas: [
                    { name: "Netrokona Sadar", bn_name: "নেত্রকোণা সদর" },
                    { name: "Khaliajuri", bn_name: "খালিয়াজুরি" },
                ],
            },
            {
                name: "Rajbari",
                bn_name: "রাজবাড়ী",
                upazilas: [
                    { name: "Rajbari Sadar", bn_name: "রাজবাড়ী সদর" },
                    { name: "Pangsha", bn_name: "পাংশা" },
                ],
            },
            {
                name: "Shariatpur",
                bn_name: "শরীয়তপুর",
                upazilas: [
                    { name: "Shariatpur Sadar", bn_name: "শরীয়তপুর সদর" },
                    { name: "Bhedarganj", bn_name: "ভেদারগঞ্জ" },
                ],
            },
            {
                name: "Sherpur",
                bn_name: "শেরপুর",
                upazilas: [
                    { name: "Sherpur Sadar", bn_name: "শেরপুর সদর" },
                    { name: "Nalitabari", bn_name: "নালিতাবাড়ী" },
                ],
            },
            {
                name: "Tangail",
                bn_name: "টাঙ্গাইল",
                upazilas: [
                    { name: "Tangail Sadar", bn_name: "টাঙ্গাইল সদর" },
                    { name: "Kalihati", bn_name: "কালিহাতী" },
                ],
            },
        ],
    },
    {
        name: "Barisal",
        bn_name: "বরিশাল",
        districts: [
            {
                name: "Barguna",
                bn_name: "বরগুনা",
                upazilas: [
                    { name: "Barguna Sadar", bn_name: "বরগুনা সদর" },
                    { name: "Amtali", bn_name: "আমতলী" },
                ],
            },
            {
                name: "Barisal",
                bn_name: "বরিশাল",
                upazilas: [
                    { name: "Barisal Sadar", bn_name: "বরিশাল সদর" },
                    { name: "Bakerganj", bn_name: "বাকেরগঞ্জ" },
                ],
            },
            {
                name: "Bhola",
                bn_name: "ভোলা",
                upazilas: [
                    { name: "Bhola Sadar", bn_name: "ভোলা সদর" },
                    { name: "Daulatkhan", bn_name: "দৌলতখান" },
                ],
            },
            {
                name: "Jhalokati",
                bn_name: "ঝালকাঠি",
                upazilas: [
                    { name: "Jhalokati Sadar", bn_name: "ঝালকাঠি সদর" },
                    { name: "Nalchity", bn_name: "নলচিটি" },
                ],
            },
            {
                name: "Patuakhali",
                bn_name: "পটুয়াখালী",
                upazilas: [
                    { name: "Patuakhali Sadar", bn_name: "পটুয়াখালী সদর" },
                    { name: "Dashmina", bn_name: "দশমিনা" },
                ],
            },
            {
                name: "Pirojpur",
                bn_name: "পিরোজপুর",
                upazilas: [
                    { name: "Pirojpur Sadar", bn_name: "পিরোজপুর সদর" },
                    { name: "Mathbaria", bn_name: "মঠবাড়িয়া" },
                ],
            },
        ],
    },
    {
        name: "Chattogram",
        bn_name: "চট্টগ্রাম",
        districts: [
            {
                name: "Bandarban",
                bn_name: "বান্দরবান",
                upazilas: [
                    { name: "Bandarban Sadar", bn_name: "বান্দরবান সদর" },
                    { name: "Ruma", bn_name: "রুমা" },
                ],
            },
            {
                name: "Brahmanbaria",
                bn_name: "ব্রাহ্মণবাড়িয়া",
                upazilas: [
                    {
                        name: "Brahmanbaria Sadar",
                        bn_name: "ব্রাহ্মণবাড়িয়া সদর",
                    },
                    { name: "Nabinagar", bn_name: "নবীনগর" },
                ],
            },
            {
                name: "Chandpur",
                bn_name: "চাঁদপুর",
                upazilas: [
                    { name: "Chandpur Sadar", bn_name: "চাঁদপুর সদর" },
                    { name: "Haimchar", bn_name: "হাইমচর" },
                ],
            },
            {
                name: "Chattogram",
                bn_name: "চট্টগ্রাম",
                upazilas: [
                    { name: "Chattogram City", bn_name: "চট্টগ্রাম সিটি" },
                    { name: "Raozan", bn_name: "রাউজান" },
                ],
            },
            {
                name: "Cumilla",
                bn_name: "কুমিল্লা",
                upazilas: [
                    { name: "Cumilla Sadar", bn_name: "কুমিল্লা সদর" },
                    { name: "Debidwar", bn_name: "দেবিদ্বার" },
                ],
            },
            {
                name: "Cox's Bazar",
                bn_name: "কক্সবাজার",
                upazilas: [
                    { name: "Cox's Bazar Sadar", bn_name: "কক্সবাজার সদর" },
                    { name: "Teknaf", bn_name: "টেকনাফ" },
                ],
            },
            {
                name: "Feni",
                bn_name: "ফেনী",
                upazilas: [
                    { name: "Feni Sadar", bn_name: "ফেনী সদর" },
                    { name: "Sonagazi", bn_name: "সোনাগাজী" },
                ],
            },
            {
                name: "Khagrachhari",
                bn_name: "খাগড়াছড়ি",
                upazilas: [
                    { name: "Khagrachhari Sadar", bn_name: "খাগড়াছড়ি সদর" },
                    { name: "Panchhari", bn_name: "পানছড়ি" },
                ],
            },
            {
                name: "Lakshmipur",
                bn_name: "লক্ষ্মীপুর",
                upazilas: [
                    { name: "Lakshmipur Sadar", bn_name: "লক্ষ্মীপুর সদর" },
                    { name: "Ramgati", bn_name: "রামগতি" },
                ],
            },
            {
                name: "Noakhali",
                bn_name: "নোয়াখালী",
                upazilas: [
                    { name: "Noakhali Sadar", bn_name: "নোয়াখালী সদর" },
                    { name: "Begumganj", bn_name: "বেগমগঞ্জ" },
                ],
            },
            {
                name: "Rangamati",
                bn_name: "রাঙ্গামাটি",
                upazilas: [
                    { name: "Rangamati Sadar", bn_name: "রাঙ্গামাটি সদর" },
                    { name: "Kawkhali", bn_name: "কাউখালি" },
                ],
            },
        ],
    },
    {
        name: "Khulna",
        bn_name: "খুলনা",
        districts: [
            {
                name: "Bagerhat",
                bn_name: "বাগেরহাট",
                upazilas: [
                    { name: "Bagerhat Sadar", bn_name: "বাগেরহাট সদর" },
                    { name: "Mongla", bn_name: "মোংলা" },
                ],
            },
            {
                name: "Chuadanga",
                bn_name: "চুয়াডাঙ্গা",
                upazilas: [
                    { name: "Chuadanga Sadar", bn_name: "চুয়াডাঙ্গা সদর" },
                    { name: "Damurhuda", bn_name: "দামুড়হুদা" },
                ],
            },
            {
                name: "Jessore",
                bn_name: "যশোর",
                upazilas: [
                    { name: "Jessore Sadar", bn_name: "যশোর সদর" },
                    { name: "Chaugachha", bn_name: "চৌগাছা" },
                ],
            },
            {
                name: "Jhinaidah",
                bn_name: "ঝিনাইদহ",
                upazilas: [
                    { name: "Jhinaidah Sadar", bn_name: "ঝিনাইদহ সদর" },
                    { name: "Shailkupa", bn_name: "শৈলকুপা" },
                ],
            },
            {
                name: "Khulna",
                bn_name: "খুলনা",
                upazilas: [
                    { name: "Khulna Sadar", bn_name: "খুলনা সদর" },
                    { name: "Dighalia", bn_name: "দিঘলিয়া" },
                ],
            },
            {
                name: "Kushtia",
                bn_name: "কুষ্টিয়া",
                upazilas: [
                    { name: "Kushtia Sadar", bn_name: "কুষ্টিয়া সদর" },
                    { name: "Bheramara", bn_name: "ভেড়ামারা" },
                ],
            },
            {
                name: "Magura",
                bn_name: "মাগুরা",
                upazilas: [
                    { name: "Magura Sadar", bn_name: "মাগুরা সদর" },
                    { name: "Sreepur", bn_name: "শ্রীপুর" },
                ],
            },
            {
                name: "Meherpur",
                bn_name: "মেহেরপুর",
                upazilas: [
                    { name: "Meherpur Sadar", bn_name: "মেহেরপুর সদর" },
                    { name: "Mujibnagar", bn_name: "মুজিবনগর" },
                ],
            },
            {
                name: "Narail",
                bn_name: "নরাইল",
                upazilas: [
                    { name: "Narail Sadar", bn_name: "নরাইল সদর" },
                    { name: "Kalia", bn_name: "কালিয়া" },
                ],
            },
            {
                name: "Satkhira",
                bn_name: "সাতক্ষীরা",
                upazilas: [
                    { name: "Satkhira Sadar", bn_name: "সাতক্ষীরা সদর" },
                    { name: "Debhata", bn_name: "দেবহাটা" },
                ],
            },
        ],
    },
    {
        name: "Mymensingh",
        bn_name: "ময়মনসিংহ",
        districts: [
            {
                name: "Jamalpur",
                bn_name: "জামালপুর",
                upazilas: [
                    { name: "Jamalpur Sadar", bn_name: "জামালপুর সদর" },
                    { name: "Sarishabari", bn_name: "সরিষাবাড়ী" },
                ],
            },
            {
                name: "Mymensingh",
                bn_name: "ময়মনসিংহ",
                upazilas: [
                    { name: "Mymensingh Sadar", bn_name: "ময়মনসিংহ সদর" },
                    { name: "Phulpur", bn_name: "ফুলপুর" },
                ],
            },
            {
                name: "Netrokona",
                bn_name: "নেত্রকোণা",
                upazilas: [
                    { name: "Netrokona Sadar", bn_name: "নেত্রকোণা সদর" },
                    { name: "Mohanganj", bn_name: "মোহনগঞ্জ" },
                ],
            },
            {
                name: "Sherpur",
                bn_name: "শেরপুর",
                upazilas: [
                    { name: "Sherpur Sadar", bn_name: "শেরপুর সদর" },
                    { name: "Nakla", bn_name: "নাকলা" },
                ],
            },
        ],
    },
    {
        name: "Rajshahi",
        bn_name: "রাজশাহী",
        districts: [
            {
                name: "Bogura",
                bn_name: "বগুড়া",
                upazilas: [
                    { name: "Bogura Sadar", bn_name: "বগুড়া সদর" },
                    { name: "Sariakandi", bn_name: "সারিয়াকান্দি" },
                ],
            },
            {
                name: "Joypurhat",
                bn_name: "জয়পুরহাট",
                upazilas: [
                    { name: "Joypurhat Sadar", bn_name: "জয়পুরহাট সদর" },
                    { name: "Panchbibi", bn_name: "পাঁচবিবি" },
                ],
            },
            {
                name: "Naogaon",
                bn_name: "নওগাঁ",
                upazilas: [
                    { name: "Naogaon Sadar", bn_name: "নওগাঁ সদর" },
                    { name: "Manda", bn_name: "মণ্ডা" },
                ],
            },
            {
                name: "Natore",
                bn_name: "নাটোর",
                upazilas: [
                    { name: "Natore Sadar", bn_name: "নাটোর সদর" },
                    { name: "Baraigram", bn_name: "বরাহগ্রাম" },
                ],
            },
            {
                name: "Pabna",
                bn_name: "পাবনা",
                upazilas: [
                    { name: "Pabna Sadar", bn_name: "পাবনা সদর" },
                    { name: "Chatmohar", bn_name: "চাটমোহর" },
                ],
            },
            {
                name: "Rajshahi",
                bn_name: "রাজশাহী",
                upazilas: [
                    { name: "Rajshahi Sadar", bn_name: "রাজশাহী সদর" },
                    { name: "Puthia", bn_name: "পুঠিয়া" },
                ],
            },
            {
                name: "Sirajganj",
                bn_name: "সিরাজগঞ্জ",
                upazilas: [
                    { name: "Sirajganj Sadar", bn_name: "সিরাজগঞ্জ সদর" },
                    { name: "Kazipur", bn_name: "কাজীপুর" },
                ],
            },
        ],
    },
    {
        name: "Rangpur",
        bn_name: "রংপুর",
        districts: [
            {
                name: "Dinajpur",
                bn_name: "দিনাজপুর",
                upazilas: [
                    { name: "Dinajpur Sadar", bn_name: "দিনাজপুর সদর" },
                    { name: "Birampur", bn_name: "বিরামপুর" },
                ],
            },
            {
                name: "Gaibandha",
                bn_name: "গাইবান্ধা",
                upazilas: [
                    { name: "Gaibandha Sadar", bn_name: "গাইবান্ধা সদর" },
                    { name: "Saghata", bn_name: "সাঘাটা" },
                ],
            },
            {
                name: "Kurigram",
                bn_name: "কুড়িগ্রাম",
                upazilas: [
                    { name: "Kurigram Sadar", bn_name: "কুড়িগ্রাম সদর" },
                    { name: "Nageshwari", bn_name: "নাগেশ্বরী" },
                ],
            },
            {
                name: "Lalmonirhat",
                bn_name: "লালমনিরহাট",
                upazilas: [
                    { name: "Lalmonirhat Sadar", bn_name: "লালমনিরহাট সদর" },
                    { name: "Hatibandha", bn_name: "হাতীবান্ধা" },
                ],
            },
            {
                name: "Nilphamari",
                bn_name: "নীলফামারী",
                upazilas: [
                    { name: "Nilphamari Sadar", bn_name: "নীলফামারী সদর" },
                    { name: "Jaldhaka", bn_name: "জলঢাকা" },
                ],
            },
            {
                name: "Panchagarh",
                bn_name: "পঞ্চগড়",
                upazilas: [
                    { name: "Panchagarh Sadar", bn_name: "পঞ্চগড় সদর" },
                    { name: "Tetulia", bn_name: "তেতুলিয়া" },
                ],
            },
            {
                name: "Rangpur",
                bn_name: "রংপুর",
                upazilas: [
                    { name: "Rangpur Sadar", bn_name: "রংপুর সদর" },
                    { name: "Badarganj", bn_name: "বদরগঞ্জ" },
                ],
            },
            {
                name: "Thakurgaon",
                bn_name: "ঠাকুরগাঁও",
                upazilas: [
                    { name: "Thakurgaon Sadar", bn_name: "ঠাকুরগাঁও সদর" },
                    { name: "Pirganj", bn_name: "পীরগঞ্জ" },
                ],
            },
        ],
    },
    {
        name: "Sylhet",
        bn_name: "সিলেট",
        districts: [
            {
                name: "Habiganj",
                bn_name: "হবিগঞ্জ",
                upazilas: [
                    { name: "Habiganj Sadar", bn_name: "হবিগঞ্জ সদর" },
                    { name: "Nabiganj", bn_name: "নবীগঞ্জ" },
                ],
            },
            {
                name: "Maulvibazar",
                bn_name: "মৌলভীবাজার",
                upazilas: [
                    { name: "Maulvibazar Sadar", bn_name: "মৌলভীবাজার সদর" },
                    { name: "Kamalganj", bn_name: "কমলগঞ্জ" },
                ],
            },
            {
                name: "Sunamganj",
                bn_name: "সুনামগঞ্জ",
                upazilas: [
                    { name: "Sunamganj Sadar", bn_name: "সুনামগঞ্জ সদর" },
                    { name: "Jagannathpur", bn_name: "জগন্নাথপুর" },
                ],
            },
            {
                name: "Sylhet",
                bn_name: "সিলেট",
                upazilas: [
                    { name: "Sylhet Sadar", bn_name: "সিলেট সদর" },
                    { name: "Beanibazar", bn_name: "বৈষ্ণবপাড়া" },
                ],
            },
        ],
    },
];

let bangladeshGeoPromise = null;

document.addEventListener("DOMContentLoaded", function () {
    const alerts = document.querySelectorAll(".alert");
    alerts.forEach(function (alert) {
        setTimeout(function () {
            const closeBtn = alert.querySelector(".btn-close");
            if (closeBtn) closeBtn.click();
        }, 5000);
    });

    const ratingInputs = document.querySelectorAll(".rating-input");
    ratingInputs.forEach(function (input) {
        input.addEventListener("change", function () {
            const stars = document.querySelectorAll(".rating-star");
            const val = parseInt(this.value);
            stars.forEach(function (star, i) {
                star.classList.toggle("bi-star-fill", i < val);
                star.classList.toggle("bi-star", i >= val);
            });
        });
    });

    initializeBangladeshLocationPickers();
    setTimeout(initializeBangladeshLocationPickers, 100);
});

function initializeBangladeshLocationPickers() {
    const pickerContainers = document.querySelectorAll(
        "[data-bd-location-picker]",
    );

    if (!pickerContainers.length) {
        return;
    }

    loadBangladeshGeoData()
        .then(function (geoData) {
            const districts = flattenBangladeshDistricts(geoData);

            pickerContainers.forEach(function (container) {
                const hiddenInput = findLocationValueInput(container);
                const divisionSelect = container.querySelector(
                    "[data-bd-division-select]",
                );
                const districtSelect = container.querySelector(
                    "[data-bd-district-select]",
                );
                const upazilaSelect = container.querySelector(
                    "[data-bd-upazila-select]",
                );
                const preview = container.querySelector(
                    "[data-bd-location-preview]",
                );

                if (!hiddenInput) {
                    return;
                }

                const selectedLocation = (
                    container.dataset.selectedLocation ||
                    hiddenInput.value ||
                    ""
                ).trim();
                const divisions = buildDivisionIndex(geoData);

                if (divisionSelect) {
                    populateDivisionOptions(
                        divisionSelect,
                        divisions,
                        container.dataset.allDivisionsLabel || "All Divisions",
                    );
                }

                const initialSelection = parseLocationValue(selectedLocation);
                if (divisionSelect && initialSelection.division) {
                    divisionSelect.value = normalizeDivisionName(
                        initialSelection.division,
                    );
                }

                if (districtSelect && upazilaSelect) {
                    populateDistrictOptions(
                        districtSelect,
                        districts,
                        container.dataset.allDistrictsLabel || "All Districts",
                        divisionSelect ? divisionSelect.value : "",
                    );

                    if (initialSelection.district) {
                        districtSelect.value = initialSelection.district;
                        populateUpazilaOptions(
                            upazilaSelect,
                            findDistrictData(
                                districts,
                                initialSelection.district,
                            ),
                            container.dataset.allUpazilasLabel ||
                                "All Upazilas",
                        );
                        if (initialSelection.upazila) {
                            upazilaSelect.value = initialSelection.upazila;
                        }
                    } else {
                        populateUpazilaOptions(
                            upazilaSelect,
                            null,
                            container.dataset.allUpazilasLabel ||
                                "All Upazilas",
                        );
                    }
                }

                syncHiddenLocationValue(
                    hiddenInput,
                    divisionSelect,
                    districtSelect,
                    upazilaSelect,
                    preview,
                );

                if (divisionSelect) {
                    divisionSelect.addEventListener("change", function () {
                        if (districtSelect && upazilaSelect) {
                            populateDistrictOptions(
                                districtSelect,
                                districts,
                                container.dataset.allDistrictsLabel ||
                                    "All Districts",
                                divisionSelect.value,
                            );
                            populateUpazilaOptions(
                                upazilaSelect,
                                null,
                                container.dataset.allUpazilasLabel ||
                                    "All Upazilas",
                            );
                        }
                        syncHiddenLocationValue(
                            hiddenInput,
                            divisionSelect,
                            districtSelect,
                            upazilaSelect,
                            preview,
                        );
                    });
                }

                if (districtSelect && upazilaSelect) {
                    districtSelect.addEventListener("change", function () {
                        const district = findDistrictData(
                            districts,
                            districtSelect.value,
                        );
                        populateUpazilaOptions(
                            upazilaSelect,
                            district,
                            container.dataset.allUpazilasLabel ||
                                "All Upazilas",
                        );
                        syncHiddenLocationValue(
                            hiddenInput,
                            divisionSelect,
                            districtSelect,
                            upazilaSelect,
                            preview,
                        );
                    });

                    upazilaSelect.addEventListener("change", function () {
                        syncHiddenLocationValue(
                            hiddenInput,
                            divisionSelect,
                            districtSelect,
                            upazilaSelect,
                            preview,
                        );
                    });
                }
            });
        })
        .catch(function () {
            pickerContainers.forEach(function (container) {
                const hiddenInput = findLocationValueInput(container);
                const divisionSelect = container.querySelector(
                    "[data-bd-division-select]",
                );
                const selectedLocation = (
                    container.dataset.selectedLocation ||
                    (hiddenInput ? hiddenInput.value : "") ||
                    ""
                ).trim();

                if (divisionSelect) {
                    const fallbackDivisions = buildDivisionIndex([]);
                    populateDivisionOptions(
                        divisionSelect,
                        fallbackDivisions,
                        container.dataset.allDivisionsLabel || "All Divisions",
                    );

                    const initialSelection =
                        parseLocationValue(selectedLocation);
                    if (initialSelection.division) {
                        divisionSelect.value = normalizeDivisionName(
                            initialSelection.division,
                        );
                    }
                }

                if (hiddenInput) {
                    hiddenInput.value = hiddenInput.value || "";
                }
            });
        });
}

function findLocationValueInput(container) {
    const containerInput = container.querySelector("[data-bd-location-value]");
    if (containerInput) {
        return containerInput;
    }

    const previousSibling = container.previousElementSibling;
    if (
        previousSibling &&
        previousSibling.matches("[data-bd-location-value]")
    ) {
        return previousSibling;
    }

    const fieldWrapper = container.closest(
        ".search-field, .mb-3, .col-12, .col-md-6",
    );
    if (fieldWrapper) {
        const siblingInput = fieldWrapper.querySelector(
            "[data-bd-location-value]",
        );
        if (siblingInput) {
            return siblingInput;
        }
    }

    return null;
}

function loadBangladeshGeoData() {
    if (!bangladeshGeoPromise) {
        bangladeshGeoPromise = Promise.resolve(BANGLADESH_LOCATION_DATA);
    }

    return bangladeshGeoPromise;
}

function flattenBangladeshDistricts(geoData) {
    const districts = [];

    geoData.forEach(function (division) {
        (division.districts || []).forEach(function (district) {
            districts.push({
                name: district.name,
                bnName: district.bn_name || "",
                divisionName: division.name,
                upazilas: district.upazilas || [],
            });
        });
    });

    return districts;
}

function buildDivisionIndex(geoData) {
    const byName = new Map();

    geoData.forEach(function (division) {
        const normalizedName = normalizeDivisionName(division.name || "");
        if (!normalizedName) {
            return;
        }

        byName.set(normalizedName, {
            name: normalizedName,
            bnName: division.bn_name || "",
        });
    });

    return BANGLADESH_DIVISIONS.map(function (divisionName) {
        return byName.get(divisionName) || { name: divisionName, bnName: "" };
    });
}

function normalizeDivisionName(divisionName) {
    const value = (divisionName || "").trim();
    const aliases = {
        Chittagong: "Chattogram",
        Barishal: "Barisal",
    };

    return aliases[value] || value;
}

function populateDivisionOptions(selectElement, divisions, allLabel) {
    selectElement.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = allLabel;
    selectElement.appendChild(defaultOption);

    divisions.forEach(function (division) {
        const option = document.createElement("option");
        option.value = division.name;
        option.textContent = division.bnName
            ? `${division.name} (${division.bnName})`
            : division.name;
        selectElement.appendChild(option);
    });
}

function findDistrictData(districts, districtName) {
    return (
        districts.find(function (district) {
            return district.name === districtName;
        }) || null
    );
}

function populateDistrictOptions(
    selectElement,
    districts,
    allLabel,
    divisionName,
) {
    selectElement.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = allLabel;
    selectElement.appendChild(defaultOption);

    const filteredDistricts = divisionName
        ? districts.filter(function (district) {
              return district.divisionName === divisionName;
          })
        : districts;

    filteredDistricts.forEach(function (district) {
        const option = document.createElement("option");
        option.value = district.name;
        option.textContent = district.bnName
            ? `${district.name} (${district.bnName})`
            : district.name;
        selectElement.appendChild(option);
    });
}

function populateUpazilaOptions(selectElement, district, allLabel) {
    selectElement.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = allLabel;
    selectElement.appendChild(defaultOption);

    if (
        !district ||
        !Array.isArray(district.upazilas) ||
        !district.upazilas.length
    ) {
        selectElement.disabled = true;
        return;
    }

    district.upazilas.forEach(function (upazila) {
        const option = document.createElement("option");
        option.value = upazila.name;
        option.textContent = upazila.bn_name
            ? `${upazila.name} (${upazila.bn_name})`
            : upazila.name;
        selectElement.appendChild(option);
    });

    selectElement.disabled = false;
}

function parseLocationValue(locationValue) {
    if (!locationValue) {
        return { division: "", district: "", upazila: "" };
    }

    const normalizedValue = locationValue.trim();

    if (normalizedValue.toLowerCase().startsWith("division:")) {
        const body = normalizedValue.replace(/^division\s*:\s*/i, "");
        const parts = body.split(/\s*,\s*/).filter(Boolean);

        return {
            division: (parts[0] || "").trim(),
            district: (parts[1] || "").trim(),
            upazila: parts.slice(2).join(" - ").trim(),
        };
    }

    const parts = normalizedValue.split(/\s*[,\-]\s*/).filter(Boolean);

    if (parts.length >= 2) {
        return {
            division: "",
            district: parts[0].trim(),
            upazila: parts.slice(1).join(" - ").trim(),
        };
    }

    return {
        division: "",
        district: normalizedValue,
        upazila: "",
    };
}

function syncHiddenLocationValue(
    hiddenInput,
    divisionSelect,
    districtSelect,
    upazilaSelect,
    preview,
) {
    const divisionValue = divisionSelect ? divisionSelect.value.trim() : "";
    const districtValue = districtSelect ? districtSelect.value.trim() : "";
    const upazilaValue = upazilaSelect ? upazilaSelect.value.trim() : "";

    let locationValue = "";

    if (!divisionValue && !districtValue) {
        locationValue = "";
    } else if (divisionValue && !districtValue) {
        locationValue = `Division: ${divisionValue}`;
    } else if (divisionValue) {
        locationValue = upazilaValue
            ? `Division: ${divisionValue}, ${districtValue}, ${upazilaValue}`
            : `Division: ${divisionValue}, ${districtValue}`;
    } else {
        locationValue = upazilaValue
            ? `${districtValue}, ${upazilaValue}`
            : districtValue;
    }

    hiddenInput.value = locationValue;

    if (preview) {
        preview.textContent = locationValue
            ? `Selected: ${locationValue}`
            : "Please select a location";
    }
}
