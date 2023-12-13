export function cutIPAddr(addr: string): string {
  if (addr.includes(":")) {
    // IPv6
    return addr.split(":").slice(0, 2).join(":");
  }
  return addr.split(".").slice(0, 2).join(".");
}
