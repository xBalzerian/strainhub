// Global PayPal type declaration (shared across all pages)
declare global {
  interface Window {
    paypal: {
      Buttons: (config: Record<string, unknown>) => {
        render: (selector: string) => void;
      };
    };
  }
}
export {};
