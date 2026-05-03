public class Test {
    public static void main(String[] args) throws Exception {
        String token = "zhuxiaoyizxy123456789";
        String timestamp = "1777807994";
        String nonce = "2064329709";
        String signature = "6d360a9801a0b347bcf38fa5bd5811e5802e2bca";

        String[] arr = new String[]{token, timestamp, nonce};
        java.util.Arrays.sort(arr);

        StringBuilder content = new StringBuilder();
        for (String s : arr) {
            content.append(s);
        }
        System.out.println("Sorted: " + content.toString());

        java.security.MessageDigest md = java.security.MessageDigest.getInstance("SHA-1");
        byte[] digest = md.digest(content.toString().getBytes());
        StringBuilder strDigest = new StringBuilder();
        for (byte b : digest) {
            char[] digit = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'};
            char[] tempChar = {digit[(b >>> 4) & 0x0F], digit[b & 0x0F]};
            strDigest.append(new String(tempChar));
        }
        String tmpStr = strDigest.toString();
        System.out.println("Calculated: " + tmpStr);
        System.out.println("Match: " + tmpStr.equals(signature.toUpperCase()));
    }
}
