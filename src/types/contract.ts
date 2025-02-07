export interface Contract {
  id: string;
  contractNumber: string;
  partnerId: string;
  partnerName: string;
  documentUrl: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}
