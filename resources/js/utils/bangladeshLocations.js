export const bangladeshLocations = {
    Dhaka: {
        Dhaka: [
            "Dhaka North",
            "Dhaka South",
            "Dhamrai",
            "Keraniganj",
            "Nawabganj",
            "Savar",
            "Dohar",
            "Dhanmondi",
            "Gulshan",
            "Banani",
            "Mirpur",
            "Uttara",
            "Motijheel",
            "Tejgaon",
            "Mohammadpur",
            "Rampura",
            "Badda",
            "Bashundhara",
        ],
        Gazipur: ["Gazipur Sadar", "Kapasia"],
        Narayanganj: ["Narayanganj Sadar", "Sonargaon"],
        Narsingdi: ["Narsingdi Sadar", "Palash"],
        Faridpur: ["Faridpur Sadar", "Boalmari"],
        Tangail: ["Tangail Sadar", "Kalihati"],
        Manikganj: ["Manikganj Sadar", "Saturia"],
        Munshiganj: ["Munshiganj Sadar", "Sirajdikhan"],
        Rajbari: ["Rajbari Sadar", "Pangsha"],
        Gopalganj: ["Gopalganj Sadar", "Kashiani"],
        Madaripur: ["Madaripur Sadar", "Kalkini"],
        Shariatpur: ["Shariatpur Sadar", "Naria"],
    },
    Barisal: {
        Barisal: ["Barisal Sadar", "Bakerganj"],
        Bhola: ["Bhola Sadar", "Lalmohan"],
        Patuakhali: ["Patuakhali Sadar", "Dashmina"],
        Pirojpur: ["Pirojpur Sadar", "Nazirpur"],
        Jhalokati: ["Jhalokati Sadar", "Nalchity"],
        Barguna: ["Barguna Sadar", "Amtali"],
    },
    Chattogram: {
        Chattogram: ["Chattogram Sadar", "Raozan"],
        "Cox's Bazar": ["Teknaf", "Ukhiya"],
        Cumilla: ["Cumilla Sadar", "Burichang"],
        Feni: ["Feni Sadar", "Chhagalnaiya"],
        Noakhali: ["Noakhali Sadar", "Begumganj"],
        Bandarban: ["Bandarban Sadar", "Thanchi"],
        Rangamati: ["Rangamati Sadar", "Kawkhali"],
        Khagrachhari: ["Khagrachhari Sadar", "Dighinala"],
    },
    Khulna: {
        Khulna: ["Khulna Sadar", "Dighalia"],
        Jessore: ["Jessore Sadar", "Manirampur"],
        Satkhira: ["Satkhira Sadar", "Debhata"],
        Bagerhat: ["Bagerhat Sadar", "Mongla"],
        Magura: ["Magura Sadar", "Mohammadpur"],
        Meherpur: ["Meherpur Sadar", "Mujibnagar"],
        Narail: ["Narail Sadar", "Lohagara"],
        Chuadanga: ["Chuadanga Sadar", "Damurhuda"],
    },
    Mymensingh: {
        Mymensingh: ["Mymensingh Sadar", "Trishal"],
        Jamalpur: ["Jamalpur Sadar", "Madarganj"],
        Sherpur: ["Sherpur Sadar", "Nakla"],
        Netrokona: ["Netrokona Sadar", "Mohanganj"],
        Kishoreganj: ["Kishoreganj Sadar", "Pakundia"],
        Netrakona: ["Netrakona Sadar", "Atpara"],
    },
    Rajshahi: {
        Rajshahi: ["Rajshahi Sadar", "Paba"],
        Bogura: ["Bogura Sadar", "Sariakandi"],
        Pabna: ["Pabna Sadar", "Ishwardi"],
        Natore: ["Natore Sadar", "Baraigram"],
        Naogaon: ["Naogaon Sadar", "Manda"],
        Sirajganj: ["Sirajganj Sadar", "Kazipur"],
        Joypurhat: ["Joypurhat Sadar", "Panchbibi"],
        Chapainawabganj: ["Chapainawabganj Sadar", "Shibganj"],
    },
    Rangpur: {
        Rangpur: [
            "Rangpur Sadar",
            "Gangachhara",
            "Kaunia",
            "Badarganj",
            "Mithapukur",
            "Pirgachha",
            "Pirganj",
            "Taraganj",
        ],
        Dinajpur: ["Dinajpur Sadar", "Birganj"],
        Gaibandha: ["Gaibandha Sadar", "Sundarganj"],
        Kurigram: ["Kurigram Sadar", "Nageshwari"],
        Nilphamari: ["Nilphamari Sadar", "Dimla"],
        Thakurgaon: ["Thakurgaon Sadar", "Pirganj"],
        Lalmonirhat: ["Lalmonirhat Sadar", "Hatibandha"],
        Panchagarh: ["Panchagarh Sadar", "Tetulia"],
    },
    Sylhet: {
        Sylhet: ["Sylhet Sadar", "Kanaighat"],
        Sunamganj: ["Sunamganj Sadar", "Tahirpur"],
        Habiganj: ["Habiganj Sadar", "Nabiganj"],
        Maulvibazar: ["Maulvibazar Sadar", "Kulaura"],
        Moulvibazar: ["Moulvibazar Sadar", "Kulaura"],
    },
};

export function getDivisionOptions() {
    return Object.keys(bangladeshLocations);
}

export function getDistrictOptions(division) {
    return Object.keys(bangladeshLocations[division] || {});
}

export function getUpazilaOptions(division, district) {
    return bangladeshLocations[division]?.[district] || [];
}

export function parseLocationParts(value) {
    const cleaned = (value || "").replace(/^division\s*:\s*/i, "").trim();
    const parts = cleaned
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean);

    return {
        division: parts[0] || "",
        district: parts[1] || "",
        upazila: parts[2] || "",
    };
}

export function buildLocationValue(selection) {
    const value = [selection.division, selection.district, selection.upazila]
        .filter(Boolean)
        .join(", ");

    return value ? `Division: ${value}` : "";
}
