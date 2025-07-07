import { Routes, Route } from "react-router-dom";
import SalesDashboard from "@/pages/sales/SalesDashboard";
import CurrentSalesPayment from "@/pages/sales/current-sales/CurrentSalesPayment";
import { CurrentSalesCustomers } from "@/pages/sales/current-sales/CurrentSalesCustomers";
import CurrentSalesInvoices from "@/pages/sales/current-sales/CurrentSalesInvoices";
import { CurrentSalesStatements } from "@/pages/sales/current-sales/CurrentSalesStatements";
import { CreateInvoice } from "@/pages/sales/current-sales/CreateInvoice";
import { EditInvoice } from "@/pages/sales/current-sales/Editinvoice";
import Invoicedetails from "@/pages/sales/current-sales/Invoicedetails";

// contact sales
import ContactList from "@/pages/sales/contact/ContactList";
import Tags from "@/pages/sales/contact/Tags";
import Companies from "@/pages/sales/contact/Companies";
import Maps from "@/pages/sales/contact/Maps";

// my things 
import Tasks from "@/pages/sales/my-things/Tasks";
import MeetingSlotes from "@/pages/sales/my-things/MeetingSlotes";

// future sales
import { FutureSalesEstimate } from "@/pages/sales/future-sales/FutureSalesEstimate";
import Deals from "@/pages/sales/future-sales/Deals";
import Proposals from "@/pages/sales/future-sales/Proposals";
import ProposalDocument from "@/pages/sales/future-sales/ProposalDocument";
import { CreateEstimate } from "@/pages/sales/future-sales/CreateEstimate";
import { EditEstimate } from "@/pages/sales/future-sales/EditEstimate";
import Estimatesdetails from "@/pages/sales/future-sales/Estimatesdetails";

// sales settings
import ProductService from "@/pages/sales/sales-settings/ProductService";
import Taxes from "@/pages/sales/sales-settings/Taxes";
import Customers from "@/pages/sales/sales-settings/Customers";
import ChooseCurrency from "@/pages/sales/sales-settings/ChooseCurrency";
import Footer from "@/pages/sales/sales-settings/Footer";
import NotesAndTerms from "@/pages/sales/sales-settings/NotesAndTerms";
import Industries from "@/pages/sales/sales-settings/Industries";
import VerifyEmails from "@/pages/sales/sales-settings/VerifyEmails";
import MeetingLinks from "@/pages/sales/sales-settings/MeetingLinks";

// Tabs
import {
    CurrentSalesTabs,
    FutureSalesTabs,
    SellSettingsTabs,
    ContactSalesTabs,
    MyThingsSalesTabs
} from "@/components/custom/tabs/Tabs";

export default function SalesRoutes() {
    return (
        <Routes>
            <Route path="sales-board" element={<SalesDashboard />} />

            <Route path="contacts/*" element={<ContactSalesTabs />}>
                <Route index element={<ContactList />} />
                <Route path="tags" element={<Tags />} />
                <Route path="companies" element={<Companies />} />
                <Route path="maps" element={<Maps />} />
            </Route>

            <Route path="my-things/*" element={<MyThingsSalesTabs />}>
                <Route index element={<Tasks />} />
                <Route path="deals" element={<Deals />} />
                <Route path="freeslots" element={<MeetingSlotes />} />
                <Route path="customers" element={<Customers />} />
            </Route>

            <Route path="current-sales/*" element={<CurrentSalesTabs />}>
                <Route index element={<CurrentSalesPayment />} />
                <Route path="statements" element={<CurrentSalesStatements />} />
                <Route path="customers" element={<CurrentSalesCustomers />} />
                <Route path="invoices" element={<CurrentSalesInvoices />} />
                <Route path="invoices/create" element={<CreateInvoice />} />
                <Route path="invoices/update/:id" element={<EditInvoice />} />
                <Route path="invoices/details/:id" element={<Invoicedetails />} />
            </Route>

            <Route path="future-sales/*" element={<FutureSalesTabs />}>
                <Route index element={<FutureSalesEstimate />} />
                <Route path="deals" element={<Deals />} />
                <Route path="proposals" element={<Proposals />} />
                <Route path="proposals/create/:id" element={<ProposalDocument />} />
                <Route path="estimates/create" element={<CreateEstimate />} />
                <Route path="estimates/update/:id" element={<EditEstimate />} />
                <Route path="estimates/details/:id" element={<Estimatesdetails />} />
            </Route>

            <Route path="sales-settings/*" element={<SellSettingsTabs />}>
                <Route index element={<ProductService />} />
                <Route path="taxes" element={<Taxes />} />
                <Route path="customers" element={<Customers />} />
                <Route path="choose-currency" element={<ChooseCurrency />} />
                <Route path="footer" element={<Footer />} />
                <Route path="notes-and-terms" element={<NotesAndTerms />} />
                <Route path="industries" element={<Industries />} />
                <Route path="verify-emails" element={<VerifyEmails />} />
                <Route path="meeting-links" element={<MeetingLinks />} />
            </Route>
        </Routes>
    );
}