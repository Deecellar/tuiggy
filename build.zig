const fetch = @import("fetch.zig");
const std = @import("std");

const deps = [_]fetch.Dependency{
    .{
        .name = "zig-tracy",
        .vcs = .{
            .git = .{
                .url = "https://github.com/SpexGuy/Zig-Tracy",
                .commit = "30db753bb2c053d1abe8eec1dbb1cdfabe489143",
                .recursive = false,
            },
        },
    },
};

pub fn build(builder: *std.build.Builder) !void {
    fetch.addOption(builder, bool, "use_tracy", "Activate Tracy Profiling (Default is false)") ;
    fetch.addOption(builder,bool, "examples", "Activate Examples (Default is false)");
    try fetch.fetchAndBuild(builder, "vendor", &deps, "compile.zig");
}
