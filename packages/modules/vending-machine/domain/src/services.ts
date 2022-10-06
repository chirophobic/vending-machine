export interface IDoesAlreadyHaveItem {
    doesItemExist(item: string): Promise<boolean>;
}
