export interface PersonInfo {
  name: string;
  phone: string;
  father: string;
  mother: string;
  relation: string; // '장남', '차녀' 등
  bank: string;
  account: string;
  accountHolder: string;
}

export interface InvitationData {
  themeColor: string;
  mainPhoto: string;
  groom: PersonInfo;
  bride: PersonInfo;
  weddingDate: string; // YYYY-MM-DD
  weddingTime: string; // HH:MM
  venueName: string;
  venueAddress: string;
  venueDetail: string;
  greetingTitle: string;
  greetingContent: string;
  gallery: string[];
}
