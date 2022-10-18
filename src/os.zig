//! Just Raw terminal bindings with different OS
//! For now it just supposes termios is available as an API on most systems
//! we just do an alternative implementation for windows
const std = @import("std");
const builtin = @import("builtin");
const WindowsMask = std.bit_set.IntegerBitSet(@bitSizeOf(std.os.windows.DWORD));
const PosixMask = std.os.termios;
const CurrentOsMask = if (builtin.os.tag == .windows) WindowsMask else PosixMask;
var original_state: ?CurrentOsMask = null;
const setModeFunction = blk: {
    if (builtin.os.tag == .windows) {
        const anon = struct {
            pub extern "kernel32" fn WriteConsoleOutputW(std.os.windows.HANDLE, ?*const std.os.windows.DWORD) std.os.windows.BOOL;
        };
        break :blk anon.SetConsoleMode;
    } else {
        break :blk std.os.tcsetattr;
    }
};
const getModeFunction = blk: {
    if (builtin.os.tag == .windows) {
        break :blk std.os.windows.kernel32.GetConsoleMode;
    } else {
        break :blk std.os.tcgetattr;
    }
};
const printBuffer = blk: {
    if (builtin.os.tag == .windows) {
        const anon = struct {
            pub extern "kernel32" fn SetConsoleMode(std.os.windows.HANDLE, ?*const std.os.windows.DWORD) std.os.windows.BOOL;
        };
        break :blk anon.SetConsoleMode;
    } else {
        break :blk std.os.tcsetattr;
    }
};

pub fn startRawMode() !void {
    const stdin_handle = std.io.getStdIn().handle;
    if (builtin.os.tag == .windows) {
        var console_state = std.bit_set.IntegerBitSet(@bitSizeOf(std.os.windows.DWORD)).initEmpty();
        if (getModeFunction(stdin_handle, &console_state.mask) == 0) {
            return error.getting_console_mode_failure;
        }
        original_state = console_state;

        inline for (.{ 4, 6 }) |index| {
            console_state.toggle(index);
        }
        if (setModeFunction(stdin_handle, &console_state.mask) == 0) {
            return error.setting_console_mode_failure;
        }
    } else {
        var termios: std.os.termios = try getModeFunction(stdin_handle);
        original_state = termios;
        termios.cflag &= ~@as(u32,  (8)); // Echo
        try setModeFunction(stdin_handle, std.os.TCSA.FLUSH, termios);
    }
}

pub fn disableRawMode() !void {
    const stdin_handle = std.io.getStdIn().handle;
    if (original_state) |og| {
        if (builtin.os.tag == .windows) {
            if (setModeFunction(stdin_handle, &og.mask) == 0) {
                return error.setting_console_mode_failure;
            }
        } else {
            try setModeFunction(stdin_handle, std.os.TCSA.FLUSH, og);
        }
    }
}
