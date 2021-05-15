import Store from "./store";

describe("[store]", () => {
  describe("[기능]", () => {
    it("store는 싱글톤", () => {
      const store_1 = new Store();
      const store_2 = new Store();
      expect(store_1 === store_2).toBeTruthy();

      const store_3 = Store.getInstance();
      const store_4 = Store.getInstance();
      expect(store_3 === store_4).toBeTruthy();

      expect(store_1 === store_3).toBeTruthy();
    });
  });
});
