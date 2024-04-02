export abstract class BaseUI {
  protected domElement: HTMLElement;

  constructor(_domElement: HTMLElement | null) {
    if (_domElement == null) throw new Error("UI Dom not found");
    this.domElement = _domElement;
  }

  public abstract constructUi(): void;
  public abstract destroyUi(): void;
}
