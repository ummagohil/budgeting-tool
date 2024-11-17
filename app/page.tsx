"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  PoundSterling,
  PiggyBank,
  CreditCard,
  Home,
  Lightbulb,
  BarChart3,
  Wallet,
  TrendingUp,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";

const BudgetTracker = () => {
  const [budget, setBudget] = useState({
    income: "",
    mortgage: "",
    bills: "",
    creditCard: "",
    stocksShares: "",
    other: "",
    savings: "",
  });

  const [forecastSettings, setForecastSettings] = useState({
    months: 12,
    incomeGrowth: 2,
    expenseGrowth: 3,
    investmentReturn: 5,
  });

  const [analysis, setAnalysis] = useState({
    totalExpenses: 0,
    disposableIncome: 0,
    savingsRate: 0,
    accountBalance: 0,
    expenseBreakdown: [],
    forecast: [],
  });

  const calculateForecast = (currentBalance: number) => {
    const months = Array.from(
      { length: forecastSettings.months },
      (_, i) => i + 1
    );
    let currentIncome = Number(budget.income) || 0;
    let currentExpenses = analysis.totalExpenses;
    // let currentSavings = Number(budget.savings) || 0;
    let currentInvestments = Number(budget.stocksShares) || 0;
    let accountBalance = currentBalance;

    const monthlyIncomeGrowth = forecastSettings.incomeGrowth / 1200;
    const monthlyExpenseGrowth = forecastSettings.expenseGrowth / 1200;
    const monthlyInvestmentReturn = forecastSettings.investmentReturn / 1200;

    return months.map((month) => {
      currentIncome *= 1 + monthlyIncomeGrowth;
      currentExpenses *= 1 + monthlyExpenseGrowth;
      currentInvestments *= 1 + monthlyInvestmentReturn;
      currentInvestments += Number(budget.stocksShares) || 0;

      accountBalance += currentIncome - currentExpenses;

      return {
        month: `Month ${month}`,
        projectedIncome: currentIncome,
        projectedExpenses: currentExpenses,
        projectedSavings: currentIncome - currentExpenses,
        projectedInvestments: currentInvestments,
        projectedBalance: accountBalance,
      };
    });
  };

  useEffect(() => {
    const expenses = {
      Mortgage: Number(budget.mortgage) || 0,
      Bills: Number(budget.bills) || 0,
      "Credit Card": Number(budget.creditCard) || 0,
      "Stocks & Shares": Number(budget.stocksShares) || 0,
      Other: Number(budget.other) || 0,
      Savings: Number(budget.savings) || 0,
    };

    const totalExpenses = Object.values(expenses).reduce(
      (acc, curr) => acc + curr,
      0
    );
    const income = Number(budget.income) || 0;
    const disposableIncome = income - totalExpenses;
    const savingsRate = income
      ? ((Number(budget.savings) || 0) / income) * 100
      : 0;
    const currentBalance = income - totalExpenses; // Monthly net change in balance

    const expenseBreakdown: any = Object.entries(expenses).map(
      ([name, value]) => ({
        name,
        value,
        percentage: income ? (value / income) * 100 : 0,
      })
    );

    const forecast: any = calculateForecast(currentBalance);

    setAnalysis({
      totalExpenses,
      disposableIncome,
      savingsRate,
      accountBalance: currentBalance,
      expenseBreakdown,
      forecast,
    });
  }, [budget, forecastSettings]);

  const handleInputChange = (field: string) => (e: any) => {
    setBudget((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleForecastChange = (field: any, value: any) => {
    setForecastSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
  ];

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-6 w-6" />
            Budget Tracker & Forecasting
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {/* Input Fields Container */}
          <div className="flex flex-wrap gap-4">
            {/* Income Input */}
            <div className="flex flex-col gap-2 flex-1 min-w-[200px]">
              <Label className="flex items-center gap-2">
                <PoundSterling className="h-4 w-4" />
                Income
              </Label>
              <Input
                type="number"
                value={budget.income}
                onChange={handleInputChange("income")}
                placeholder="Monthly income"
              />
            </div>

            {/* Mortgage Input */}
            <div className="flex flex-col gap-2 flex-1 min-w-[200px]">
              <Label className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Mortgage
              </Label>
              <Input
                type="number"
                value={budget.mortgage}
                onChange={handleInputChange("mortgage")}
                placeholder="Mortgage payment"
              />
            </div>

            {/* Bills Input */}
            <div className="flex flex-col gap-2 flex-1 min-w-[200px]">
              <Label className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Bills
              </Label>
              <Input
                type="number"
                value={budget.bills}
                onChange={handleInputChange("bills")}
                placeholder="Monthly bills"
              />
            </div>

            {/* Credit Card Input */}
            <div className="flex flex-col gap-2 flex-1 min-w-[200px]">
              <Label className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Credit Card
              </Label>
              <Input
                type="number"
                value={budget.creditCard}
                onChange={handleInputChange("creditCard")}
                placeholder="Credit card payment"
              />
            </div>

            {/* Stocks & Shares Input */}
            <div className="flex flex-col gap-2 flex-1 min-w-[200px]">
              <Label className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Stocks & Shares
              </Label>
              <Input
                type="number"
                value={budget.stocksShares}
                onChange={handleInputChange("stocksShares")}
                placeholder="Investment amount"
              />
            </div>

            {/* Other Input */}
            <div className="flex flex-col gap-2 flex-1 min-w-[200px]">
              <Label>Other Expenses</Label>
              <Input
                type="number"
                value={budget.other}
                onChange={handleInputChange("other")}
                placeholder="Other expenses"
              />
            </div>

            {/* Savings Input */}
            <div className="flex flex-col gap-2 flex-1 min-w-[200px]">
              <Label className="flex items-center gap-2">
                <PiggyBank className="h-4 w-4" />
                Savings
              </Label>
              <Input
                type="number"
                value={budget.savings}
                onChange={handleInputChange("savings")}
                placeholder="Monthly savings"
              />
            </div>
          </div>

          {/* Forecasting Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6" />
                Forecast Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-6">
                <div className="flex flex-col gap-4 flex-1 min-w-[200px]">
                  <Label>Forecast Period (Months)</Label>
                  <Select
                    value={forecastSettings.months.toString()}
                    onValueChange={(value) =>
                      handleForecastChange("months", parseInt(value))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select months" />
                    </SelectTrigger>
                    <SelectContent>
                      {[3, 6, 12, 24, 36, 60].map((month) => (
                        <SelectItem key={month} value={month.toString()}>
                          {month} months
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-4 flex-1 min-w-[200px]">
                  <Label>Annual Income Growth (%)</Label>
                  <Slider
                    value={[forecastSettings.incomeGrowth]}
                    onValueChange={([value]) =>
                      handleForecastChange("incomeGrowth", value)
                    }
                    min={0}
                    max={10}
                    step={0.5}
                  />
                  <div className="text-sm text-center">
                    {forecastSettings.incomeGrowth}%
                  </div>
                </div>

                <div className="flex flex-col gap-4 flex-1 min-w-[200px]">
                  <Label>Annual Expense Growth (%)</Label>
                  <Slider
                    value={[forecastSettings.expenseGrowth]}
                    onValueChange={([value]) =>
                      handleForecastChange("expenseGrowth", value)
                    }
                    min={0}
                    max={10}
                    step={0.5}
                  />
                  <div className="text-sm text-center">
                    {forecastSettings.expenseGrowth}%
                  </div>
                </div>

                <div className="flex flex-col gap-4 flex-1 min-w-[200px]">
                  <Label>Annual Investment Return (%)</Label>
                  <Slider
                    value={[forecastSettings.investmentReturn]}
                    onValueChange={([value]) =>
                      handleForecastChange("investmentReturn", value)
                    }
                    min={0}
                    max={15}
                    step={0.5}
                  />
                  <div className="text-sm text-center">
                    {forecastSettings.investmentReturn}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analysis Section */}
          <div className="flex flex-wrap gap-6">
            {/* Summary Stats */}
            <Card className="flex-1 min-w-[300px]">
              <CardHeader>
                <CardTitle>Current Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <p>Total Expenses: £{analysis.totalExpenses.toFixed(2)}</p>
                  <p>
                    Disposable Income: £{analysis.disposableIncome.toFixed(2)}
                  </p>
                  <p>Savings Rate: {analysis.savingsRate.toFixed(1)}%</p>
                  <p>
                    Monthly Balance Change: £
                    {analysis.accountBalance.toFixed(2)}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Pie Chart */}
            <Card className="flex-1 min-w-[300px]">
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analysis.expenseBreakdown}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, percentage }) =>
                          `${name}: ${percentage.toFixed(1)}%`
                        }
                      >
                        {analysis.expenseBreakdown.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Forecast Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Financial Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analysis.forecast}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="projectedIncome"
                      name="Income"
                      stroke="#0088FE"
                    />
                    <Line
                      type="monotone"
                      dataKey="projectedExpenses"
                      name="Expenses"
                      stroke="#FF8042"
                    />
                    <Line
                      type="monotone"
                      dataKey="projectedSavings"
                      name="Savings"
                      stroke="#00C49F"
                    />
                    <Line
                      type="monotone"
                      dataKey="projectedInvestments"
                      name="Investments"
                      stroke="#FFBB28"
                    />
                    <Line
                      type="monotone"
                      dataKey="projectedBalance"
                      name="Account Balance"
                      stroke="#8884d8"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetTracker;
