export interface IUserProps {
  id: string;
  phoneNumber?: string | null | undefined;
  isAdmin: boolean | undefined;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}
