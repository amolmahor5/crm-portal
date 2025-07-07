import { Routes, Route } from "react-router-dom";
import OverviewBoard from "@/pages/finance/OverviewBoard";
import Transactions from "@/pages/finance/Transactions";
import Bills from "@/pages/finance/Purchases/Bills";
import Reimbursements from "@/pages/finance/Purchases/Reimbursements";
import Income from "@/pages/finance/Income/Income";
import Invoices from "@/pages/finance/Income/Invoices";
import ProfitLoss from "@/pages/finance/reports/ProfitLoss";
import CashFlow from "@/pages/finance/reports/CashFlow";
import BalanceSheet from "@/pages/finance/reports/BalanceSheet";
import FiscalYear from "@/pages/finance/settings/FiscalYear";
import ProductService from "@/pages/sales/sales-settings/ProductService";
import Vendors from "@/pages/finance/settings/Vendors";

import { PurchasesTabs, IncomeTabs, ReportFinanceTabs, FinanceSettingsTabs } from "@/components/custom/tabs/Tabs";

export default function FinanceRoutes() {
    return (
        <Routes>
            <Route path="transactions" element={<Transactions />} />
            <Route path="board" element={<OverviewBoard />} />
            <Route path="purchases/*" element={<PurchasesTabs />}>
                <Route index element={<Bills />} />
                <Route path="bills" element={<Bills />} />
                <Route path="reimbursements" element={<Reimbursements />} />
            </Route>
            <Route path="income/*" element={<IncomeTabs />}>
                <Route index element={<Income />} />
                <Route path="" element={<Income />} />
                <Route path="invoices" element={<Invoices />} />
            </Route>
            <Route path="reports/*" element={<ReportFinanceTabs />}>
                <Route path="profit-loss" element={<ProfitLoss />} />
                <Route path="cash-flow" element={<CashFlow />} />
                <Route path="balance-sheet" element={<BalanceSheet />} />
            </Route>
            <Route path="settings/*" element={<FinanceSettingsTabs />}>
                <Route path="" element={<FiscalYear />} />
                <Route path="products&services" element={<ProductService />} />
                <Route path="vendors" element={<Vendors />} />
            </Route>
        </Routes>
    );
}