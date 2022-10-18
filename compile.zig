const std = @import("std");
const tracy_build = @import("vendor/zig-tracy/build_tracy.zig");
pub fn build(b: *std.build.Builder) void {
    // Standard release options allow the person running `zig build` to select
    // between Debug, ReleaseSafe, ReleaseFast, and ReleaseSmall.
    const mode = b.standardReleaseOptions();
    const target = b.standardTargetOptions(.{});
    var path_to_tracy = "vendor/zig-tracy/tracy-0.7.8";
    var use_tracy = b.option(bool, "use_tracy", "Activate Tracy Profiling (Default is false)") orelse false;
    var build_examples = b.option(bool, "examples", "Activate Examples (Default is false)") orelse true;
    var options = b.addOptions();
    options.addOption(bool, "tracy_enabled", use_tracy);
    var tracy = std.build.Pkg{
        .name = "tracy",
        .source = .{ .path = "vendor/zig-tracy/tracy.zig" },
    };

    const lib = b.addStaticLibrary("tuiggy", "src/main.zig");
    lib.setBuildMode(mode);
    lib.setTarget(target);
    // if (use_tracy) {
        tracy_build.link(b,lib, path_to_tracy);
        lib.addPackage(tracy);
    // }

    lib.install();

    lib.emit_docs = .emit;

    if (build_examples) {
        const example = b.addExecutable("tuiggy_example", "examples/example.zig");
        example.setBuildMode(mode);
        example.setTarget(target);
        example.addPackage(std.build.Pkg{
            .name = "tuiggy",
            .source = .{ .path = "src/main.zig" },
            .dependencies = &[_]std.build.Pkg{
                tracy
            },
        });
        if (use_tracy) {
            tracy_build.link(b,example, path_to_tracy);
            example.addPackage(tracy);
        }
        example.install();
    }
    const main_tests = b.addTest("src/main.zig");
    main_tests.setBuildMode(mode);

    const test_step = b.step("test", "Run library tests");
    test_step.dependOn(&main_tests.step);
}
