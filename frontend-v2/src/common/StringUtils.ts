export class StringUtils {

  public static urlfriendlify(s: string) {
    return s.replace(/[^a-z0-9]/gi, "-").toLowerCase();
  }

}
