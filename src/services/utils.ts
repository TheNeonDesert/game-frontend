import { Notify } from 'quasar';

export default class Utils {
  static notify(text: string) {
    Notify.create({
      message: text,
    });
  }

  static success(text: string) {
    Notify.create({
      message: text,
      icon: 'check_circle',
      classes: 'neon-q-notify',
    });
  }

  static error(text: string, err?: unknown) {
    let message = text;
    if (err && (err as { message?: string }).message) {
      message += (': ' + (err as { message?: string }).message) as string;
    } else if (err && typeof err === 'string' && err.length > 0) {
      message += ': ' + err;
    }
    Notify.create({
      message: message,
      icon: 'error',
      classes: 'neon-q-notify-error',
    });
  }
}
