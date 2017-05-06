export class StringUtils {

  static urlfriendlify(s: String) {
    return s.replace(/[^a-z0-9]/gi, '-').toLowerCase();
  }

}