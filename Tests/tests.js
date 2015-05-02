var total = 0,
    games = [
        function () {
            total += 1;
        },
        function () {
            total += 2;
        }
    ],
    interval = 16,
    speed = 1,
    onPause = function () {
        return "Paused!";
    },
    onPlay = function () {
        return "Playing!";
    },
    callbackArguments = [],
    upkeepScheduler = function (event, timeout) {
        return setTimeout(event, timeout);
    },
    upkeepCanceller = function (code) {
        clearTimeout(code);
    },
    FPSAnalyzer = new FPSAnalyzr({}),
    adjustFramerate = true,
    scope = {},
    getTimestamp,
    GamesRunner;

if (typeof performance === "undefined") {
    getTimestamp = function () {
        return Date.now();
    };
} else {
    getTimestamp = (
        performance.now
        || performance.webkitNow
        || performance.mozNow
        || performance.msNow
        || performance.oNow
     ).bind(performance);
}

describe("constructor", function () {
    it("throws an error if not given games", function () {
        chai.expect(function () {
            new GamesRunnr({});
        }).to.throw("No games given to GamesRunnr.");
    });

    it("doesn't throw an error when given games", function () {
        new GamesRunnr({
            "games": []
        });
    });

    it("stores the given member variables", function () {
        GamesRunner = new GamesRunnr({
            "games": games,
            "interval": interval,
            "speed": speed,
            "onPause": onPause,
            "onPlay": onPlay,
            "callbackArguments": callbackArguments,
            "upkeepScheduler": upkeepScheduler,
            "upkeepCanceller": upkeepCanceller,
            "FPSAnalyzer": FPSAnalyzer,
            "adjustFramerate": adjustFramerate,
            "scope": scope
        });

        chai.expect(GamesRunner.getGames()).to.be.equal(games);
        chai.expect(GamesRunner.getInterval()).to.be.equal(interval);
        chai.expect(GamesRunner.getSpeed()).to.be.equal(speed);
        chai.expect(GamesRunner.getOnPause()).to.be.equal(onPause);
        chai.expect(GamesRunner.getOnPlay()).to.be.equal(onPlay);
        chai.expect(GamesRunner.getCallbackArguments()).to.be.equal(callbackArguments);
        chai.expect(GamesRunner.getUpkeepScheduler()).to.be.equal(upkeepScheduler);
    });
});