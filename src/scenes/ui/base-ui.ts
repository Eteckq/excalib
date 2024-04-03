export abstract class BaseUI {
  protected domElement: HTMLElement;

  constructor(private id: string) {
    const rootElement = document.getElementById("root");
    if (rootElement == null) throw new Error("UI Dom not found");
    this.domElement = document.createElement("div");
    this.domElement.id = this.id;
    rootElement.appendChild(this.domElement);
  }

  protected getDomElement() {
    return this.domElement;
  }

  public abstract constructUi(): void;

  public destroyUi() {
    this.getDomElement().innerHTML = "";
  }
}
