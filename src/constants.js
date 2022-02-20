// Web Hook types:
export const COVID_DATA = "COVID_DATA";
export const AIR_DATA = "AIR_DATA";

// Sample JSONs
export const COVID_WH_JSON_SAMPLE = {
    "updated": "Jan 27, 2022, 11:56:22 PM",
    "country": "Serbia",
    "cases": 1616584,
    "todayCases": 17674,
    "deaths": 13417,
    "todayDeaths": 40,
    "recovered": 1337218,
    "todayRecovered": 7912,
    "active": 265949,
    "critical": 142,
    "casesPerOneMillion": 186196,
    "deathsPerOneMillion": 1545,
    "tests": 8010329,
    "testsPerOneMillion": 922618,
    "population": 8682174,
    "continent": "Europe",
    "oneCasePerPeople": 5,
    "oneDeathPerPeople": 647,
    "oneTestPerPeople": 1,
    "activePerOneMillion": 30631,
    "recoveredPerOneMillion": 154018,
    "criticalPerOneMillion": 16
};
export const AIR_WH_JSON_SAMPLE = {
    "status": "success",
    "data": {
        "city": "Nis",
        "state": "Central Serbia",
        "country": "Serbia",
        "current": {
            "weather": {
                "ts": "2022-01-27T06:43:15",
                "tp": -2,
                "pr": 1024,
                "hu": 100,
                "ws": 0.51,
                "wd": 0,
                "ic": "50n"
            }, "pollution": {"ts": "2022-01-27T06:33:15", "aqius": 205, "mainus": "p2", "aqicn": 204, "maincn": "p2"}
        }
    }
};
