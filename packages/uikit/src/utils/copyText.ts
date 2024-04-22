import Clipboard from "@react-native-community/clipboard";
import { t } from "@tonkeeper/shared/i18n";
// import { Toast, ToastOptions } from "../components/Toast";
import { tk } from "@tonkeeper/mobile/src/wallet";
import { Toast } from "@tonkeeper/mobile/src/store";

export const copyText =
  (value?: string | boolean, toastMessage?: string, color?: string) => () => {
    if (value) {
      Clipboard.setString(String(value));
      const message = toastMessage ?? t("copied");
      // const options: ToastOptions = {};
      if (tk.wallet?.isTestnet || tk.wallet?.isWatchOnly) {
        Toast.warning(message);
      } else {
        Toast.success(message);
      }
    }
  };
