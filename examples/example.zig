const std = @import("std");
const tuiggy = @import("tuiggy");
pub fn main() !void {
    try tuiggy.os_utils.startRawMode();
    defer tuiggy.os_utils.disableRawMode() catch {};
    
    std.log.info("owo", .{});
}