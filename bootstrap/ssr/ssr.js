import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useForm, Head, usePage, router, createInertiaApp } from "@inertiajs/react";
import { Form, notification, Card, Input, Checkbox, Button, Dropdown, Avatar, Layout, Menu, Modal, Select, DatePicker, InputNumber, Tag, Spin, Alert, Empty, Progress, Table } from "antd";
import { UserOutlined, LockOutlined, MailOutlined, LogoutOutlined, MenuUnfoldOutlined, MenuFoldOutlined, DashboardOutlined, TeamOutlined, BarChartOutlined, SearchOutlined, ExclamationCircleOutlined, CalendarOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
function Login() {
  const [form] = Form.useForm();
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
    remember: false
  });
  const [api, contextHolder] = notification.useNotification();
  const onFinish = () => {
    form.validateFields().then(() => {
      post("/login", {
        preserveScroll: true,
        onError: (error) => {
          api.error({
            message: "Login Failed",
            description: error.message || error.password || error.email || "Please check your input and try again.",
            placement: "bottom"
          });
        }
      });
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    contextHolder,
    /* @__PURE__ */ jsx(Head, { title: "Login" }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center min-h-screen bg-gray-100", children: /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-md shadow-lg mx-4", children: [
      /* @__PURE__ */ jsx("div", { className: "text-center mb-6", children: /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-gray-800 m-0", children: "Admin Login" }) }),
      /* @__PURE__ */ jsxs(
        Form,
        {
          name: "login",
          initialValues: { remember: true },
          onFinish,
          autoComplete: "off",
          layout: "vertical",
          children: [
            /* @__PURE__ */ jsx(
              Form.Item,
              {
                name: "email",
                rules: [
                  {
                    required: true,
                    message: "Please input your email!"
                  },
                  {
                    type: "email",
                    message: "Please enter a valid email!"
                  }
                ],
                validateStatus: errors.email ? "error" : "",
                help: errors.email,
                children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    prefix: /* @__PURE__ */ jsx(UserOutlined, { className: "text-gray-400" }),
                    placeholder: "Email",
                    size: "large",
                    value: data.email,
                    onChange: (e) => setData("email", e.target.value)
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(
              Form.Item,
              {
                name: "password",
                rules: [
                  {
                    required: true,
                    message: "Please input your password!"
                  }
                ],
                validateStatus: errors.password ? "error" : "",
                help: errors.password,
                children: /* @__PURE__ */ jsx(
                  Input.Password,
                  {
                    prefix: /* @__PURE__ */ jsx(LockOutlined, { className: "text-gray-400" }),
                    placeholder: "Password",
                    size: "large",
                    value: data.password,
                    onChange: (e) => setData("password", e.target.value)
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(Form.Item, { name: "remember", label: null, children: /* @__PURE__ */ jsx(
              Checkbox,
              {
                checked: data.remember,
                onChange: (e) => setData("remember", e.target.checked),
                children: " Remember me "
              }
            ) }),
            /* @__PURE__ */ jsx(Form.Item, { children: /* @__PURE__ */ jsx(
              Button,
              {
                type: "primary",
                htmlType: "submit",
                block: true,
                size: "large",
                loading: processing,
                children: "Log in"
              }
            ) })
          ]
        }
      )
    ] }) })
  ] });
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Login
}, Symbol.toStringTag, { value: "Module" }));
function AppLogo() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground ", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 40 42", xmlns: "http://www.w3.org/2000/svg", fill: "white", children: /* @__PURE__ */ jsx(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M17.2 5.63325L8.6 0.855469L0 5.63325V32.1434L16.2 41.1434L32.4 32.1434V23.699L40 19.4767V9.85547L31.4 5.07769L22.8 9.85547V18.2999L17.2 21.411V5.63325ZM38 18.2999L32.4 21.411V15.2545L38 12.1434V18.2999ZM36.9409 10.4439L31.4 13.5221L25.8591 10.4439L31.4 7.36561L36.9409 10.4439ZM24.8 18.2999V12.1434L30.4 15.2545V21.411L24.8 18.2999ZM23.8 20.0323L29.3409 23.1105L16.2 30.411L10.6591 27.3328L23.8 20.0323ZM7.6 27.9212L15.2 32.1434V38.2999L2 30.9666V7.92116L7.6 11.0323V27.9212ZM8.6 9.29991L3.05913 6.22165L8.6 3.14339L14.1409 6.22165L8.6 9.29991ZM30.4 24.8101L17.2 32.1434V38.2999L30.4 30.9666V24.8101ZM9.6 11.0323L15.2 7.92117V22.5221L9.6 25.6333V11.0323Z"
    }
  ) }) }) });
}
function UserInfo() {
  const { auth } = usePage().props;
  const getInitials = (name) => {
    const names = name.trim().split(" ");
    if (names.length === 0) return "";
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    const firstInitial = names[0].charAt(0);
    const lastInitial = names[names.length - 1].charAt(0);
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };
  const handleLogout = () => {
    router.post("/logout");
  };
  const items = [
    {
      key: "user-info",
      type: "group",
      label: /* @__PURE__ */ jsxs("div", { className: "py-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-1 w-52", children: [
          /* @__PURE__ */ jsx(UserOutlined, { className: "text-slate-500" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-slate-800", children: auth.user?.name || "User" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(MailOutlined, { className: "text-slate-500" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500", children: auth.user?.email || "email@example.com" })
        ] })
      ] })
    },
    {
      type: "divider"
    },
    {
      key: "logout",
      label: "Logout",
      icon: /* @__PURE__ */ jsx(LogoutOutlined, {}),
      danger: true,
      onClick: handleLogout
    }
  ];
  return /* @__PURE__ */ jsx(
    Dropdown,
    {
      menu: { items },
      trigger: ["click"],
      placement: "bottomRight",
      children: /* @__PURE__ */ jsx(
        Avatar,
        {
          size: "default",
          className: "cursor-pointer !bg-blue-600 !hover:bg-blue-700 transition-colors",
          icon: !auth.user?.name && /* @__PURE__ */ jsx(UserOutlined, {}),
          children: auth.user?.name && getInitials(auth.user.name)
        }
      )
    }
  );
}
const { Header, Content, Sider, Footer } = Layout;
function AuthLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { url } = usePage();
  const menuItems = [
    {
      label: "Dashboard",
      key: "/admin/dashboard",
      icon: /* @__PURE__ */ jsx(DashboardOutlined, {})
    },
    {
      label: "Users",
      key: "/admin/users",
      icon: /* @__PURE__ */ jsx(TeamOutlined, {})
    }
  ];
  const getSelectedKey = () => {
    const currentRoute = url;
    return currentRoute || "/dashboard";
  };
  const handleMenuClick = (item) => {
    router.visit(item.key);
  };
  return /* @__PURE__ */ jsxs(Layout, { className: "!min-h-screen", children: [
    /* @__PURE__ */ jsxs(Header, { className: "flex items-center justify-between !px-3 !bg-slate-900", children: [
      /* @__PURE__ */ jsx(AppLogo, {}),
      /* @__PURE__ */ jsx(UserInfo, {})
    ] }),
    /* @__PURE__ */ jsxs(Layout, { children: [
      /* @__PURE__ */ jsxs(
        Sider,
        {
          collapsible: true,
          collapsed,
          onCollapse: setCollapsed,
          trigger: null,
          className: "!bg-slate-800",
          children: [
            /* @__PURE__ */ jsx(
              Menu,
              {
                theme: "dark",
                selectedKeys: [getSelectedKey()],
                mode: "inline",
                items: menuItems,
                className: "h-full",
                onClick: handleMenuClick
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "text",
                icon: collapsed ? /* @__PURE__ */ jsx(MenuUnfoldOutlined, {}) : /* @__PURE__ */ jsx(MenuFoldOutlined, {}),
                onClick: () => setCollapsed(!collapsed),
                className: "!text-white hover:!bg-slate-800 !w-full !h-10 !absolute bottom-0"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Content, { className: "p-2 bg-slate-50 rounded-lg min-h-[280px]", children }) })
    ] }),
    /* @__PURE__ */ jsxs(Footer, { className: "text-center !bg-slate-100 !text-slate-600", children: [
      "Security Guard Management System ©",
      (/* @__PURE__ */ new Date()).getFullYear()
    ] })
  ] });
}
function Dashboard() {
  const { props } = usePage();
  const { customer_count, guards_count } = props;
  console.log(props);
  return /* @__PURE__ */ jsxs(AuthLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-slate-800 mb-4", children: "Dashboard" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-600", children: "Welcome to the Security Guard Management System dashboard." }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-slate-700", children: "Total Customers" }),
          /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-blue-600 mt-2", children: customer_count ?? "0" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-slate-700", children: "Total Guards" }),
          /* @__PURE__ */ jsxs("p", { className: "text-3xl font-bold text-blue-600 mt-2", children: [
            " ",
            guards_count ?? "0"
          ] })
        ] })
      ] })
    ] })
  ] });
}
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dashboard
}, Symbol.toStringTag, { value: "Module" }));
function Settings() {
  return /* @__PURE__ */ jsxs(AuthLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Settings" }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-slate-800 mb-4", children: "Settings" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-600 mb-6", children: "Manage your application settings and preferences." }),
      /* @__PURE__ */ jsx("div", { className: "bg-white p-6 rounded-lg shadow", children: /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-slate-700 mb-4", children: "General Settings" }) })
    ] })
  ] });
}
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Settings
}, Symbol.toStringTag, { value: "Module" }));
function CreateUserModal({ open, onClose }) {
  const [form] = Form.useForm();
  const { flash } = usePage().props;
  const [api, contextHolder] = notification.useNotification();
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    user_type: "",
    date_of_birth: ""
  });
  const handleCancel = () => {
    form.resetFields();
    reset();
    onClose();
  };
  const handleSubmit = () => {
    form.validateFields().then(() => {
      post("/admin/users/create", {
        preserveScroll: true,
        onSuccess: () => {
          api.success({
            message: "Success",
            description: flash?.success || "User created successfully!",
            placement: "bottom"
          });
          handleCancel();
        },
        onError: (errors2) => {
          api.error({
            message: "Error",
            description: errors2.message || "Failed to create user. Please check your input.",
            placement: "bottom"
          });
        }
      });
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    contextHolder,
    /* @__PURE__ */ jsx(
      Modal,
      {
        title: "Create New User",
        open,
        onOk: handleSubmit,
        onCancel: handleCancel,
        confirmLoading: processing,
        okText: "Create User",
        cancelText: "Cancel",
        width: 600,
        children: /* @__PURE__ */ jsxs(
          Form,
          {
            form,
            layout: "vertical",
            className: "mt-4",
            children: [
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  label: "Full Name",
                  name: "name",
                  rules: [
                    { required: true, message: "Please input the name!" },
                    { max: 255, message: "Name must not exceed 255 characters!" }
                  ],
                  validateStatus: errors.name ? "error" : "",
                  help: errors.name,
                  children: /* @__PURE__ */ jsx(
                    Input,
                    {
                      placeholder: "Enter full name",
                      size: "large",
                      value: data.name,
                      onChange: (e) => setData("name", e.target.value)
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  label: "Email",
                  name: "email",
                  rules: [
                    { required: true, message: "Please input the email!" },
                    { type: "email", message: "Please enter a valid email!" },
                    { max: 255, message: "Email must not exceed 255 characters!" }
                  ],
                  validateStatus: errors.email ? "error" : "",
                  help: errors.email,
                  children: /* @__PURE__ */ jsx(
                    Input,
                    {
                      placeholder: "Enter email address",
                      size: "large",
                      value: data.email,
                      onChange: (e) => setData("email", e.target.value)
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  label: "User Type",
                  name: "user_type",
                  rules: [
                    { required: true, message: "Please select a user type!" }
                  ],
                  validateStatus: errors.user_type ? "error" : "",
                  help: errors.user_type,
                  children: /* @__PURE__ */ jsxs(
                    Select,
                    {
                      placeholder: "Select user type",
                      size: "large",
                      value: data.user_type,
                      onChange: (value) => setData("user_type", value),
                      children: [
                        /* @__PURE__ */ jsx(Select.Option, { value: "CUSTOMER", children: "Customer" }),
                        /* @__PURE__ */ jsx(Select.Option, { value: "GUARD", children: "Security Guard" })
                      ]
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  label: "Date of Birth",
                  name: "date_of_birth",
                  rules: [
                    { required: true, message: "Please select date of birth!" }
                  ],
                  validateStatus: errors.date_of_birth ? "error" : "",
                  help: errors.date_of_birth,
                  children: /* @__PURE__ */ jsx(
                    DatePicker,
                    {
                      placeholder: "Select date of birth",
                      size: "large",
                      className: "w-full",
                      format: "YYYY-MM-DD",
                      onChange: (date, dateString) => setData("date_of_birth", dateString)
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-blue-800", children: [
                /* @__PURE__ */ jsx("strong", { children: "Note:" }),
                ' A default password "password" will be assigned to the new user.'
              ] }) })
            ]
          }
        )
      }
    )
  ] });
}
function useUserPairs() {
  const [pairs, setPairs] = useState([]);
  const [pairsCount, setPairsCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchPairs = async (sum) => {
    if (!sum || sum <= 0) {
      setPairs([]);
      setPairsCount(0);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/user-pairs/${sum}`);
      setPairs(response.data.pairs || []);
      setPairsCount(response.data.pairs_count || 0);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch user pairs");
      setPairs([]);
      setPairsCount(0);
    } finally {
      setLoading(false);
    }
  };
  const resetPairs = () => {
    setPairs([]);
    setPairsCount(0);
    setError(null);
  };
  return {
    pairs,
    pairsCount,
    loading,
    error,
    fetchPairs,
    resetPairs
  };
}
function UserPairsModal({ open, onClose }) {
  const [sum, setSum] = useState(null);
  const { pairs, pairsCount, loading, error, fetchPairs, resetPairs } = useUserPairs();
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (sum) {
        fetchPairs(sum);
      } else {
        resetPairs();
      }
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [sum]);
  const handleClose = () => {
    setSum(null);
    resetPairs();
    onClose();
  };
  return /* @__PURE__ */ jsx(
    Modal,
    {
      title: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(TeamOutlined, { className: "text-blue-500 text-xl" }),
        /* @__PURE__ */ jsx("span", { children: "Find User Pairs by Age Sum" })
      ] }),
      open,
      onCancel: handleClose,
      footer: null,
      width: 700,
      children: /* @__PURE__ */ jsxs("div", { className: "py-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-slate-700 mb-2", children: "Enter Age Sum" }),
          /* @__PURE__ */ jsx(
            InputNumber,
            {
              size: "large",
              placeholder: "e.g., 50",
              className: "w-full",
              min: 1,
              max: 150,
              value: sum,
              onChange: setSum
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 mt-2", children: "Find all pairs of users whose ages add up to this number" })
        ] }),
        sum && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold text-slate-800", children: "Results" }),
            !loading && pairsCount > 0 && /* @__PURE__ */ jsxs(Tag, { color: "blue", className: "text-sm", children: [
              pairsCount,
              " pair",
              pairsCount !== 1 ? "s" : "",
              " found"
            ] })
          ] }),
          loading && /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center py-12", children: /* @__PURE__ */ jsx(Spin, { size: "large", tip: "Searching for pairs..." }) }),
          error && !loading && /* @__PURE__ */ jsx(
            Alert,
            {
              message: "Error",
              description: error,
              type: "error",
              showIcon: true,
              className: "mb-4"
            }
          ),
          !loading && !error && pairsCount === 0 && /* @__PURE__ */ jsx(
            Empty,
            {
              description: /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-slate-500", children: "No pairs found" }),
                /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-sm mt-1", children: "Try a different age sum" })
              ] }),
              className: "py-8"
            }
          ),
          !loading && !error && pairsCount > 0 && /* @__PURE__ */ jsx("div", { className: "max-h-96 overflow-y-auto space-y-3", children: pairs.map((pair, index) => /* @__PURE__ */ jsx(
            "div",
            {
              className: "bg-slate-50 rounded-lg p-4 hover:bg-slate-100 transition-colors",
              children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 flex-1", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full font-semibold", children: pair[0].name.charAt(0).toUpperCase() }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "font-medium text-slate-800", children: pair[0].name }),
                    /* @__PURE__ */ jsxs("p", { className: "text-sm text-slate-600", children: [
                      "Age: ",
                      /* @__PURE__ */ jsx("span", { className: "font-semibold", children: pair[0].age })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-8 h-8 bg-slate-200 rounded-full text-slate-600 font-bold", children: "+" }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 flex-1", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-full font-semibold", children: pair[1].name.charAt(0).toUpperCase() }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "font-medium text-slate-800", children: pair[1].name }),
                    /* @__PURE__ */ jsxs("p", { className: "text-sm text-slate-600", children: [
                      "Age: ",
                      /* @__PURE__ */ jsx("span", { className: "font-semibold", children: pair[1].age })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center px-3 py-1 bg-blue-100 text-blue-700 rounded-md font-semibold text-sm", children: [
                  "= ",
                  sum
                ] })
              ] })
            },
            index
          )) })
        ] }),
        !sum && /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
          /* @__PURE__ */ jsx(UserOutlined, { className: "text-slate-300 text-4xl mb-3" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-500", children: "Enter an age sum to find matching user pairs" })
        ] })
      ] })
    }
  );
}
function useAgeDistribution() {
  const [distribution, setDistribution] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchDistribution = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/age-distribution");
      setDistribution(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch age distribution");
      setDistribution([]);
    } finally {
      setLoading(false);
    }
  };
  const resetDistribution = () => {
    setDistribution([]);
    setError(null);
  };
  return {
    distribution,
    loading,
    error,
    fetchDistribution,
    resetDistribution
  };
}
function AgeDistributionModal({ open, onClose }) {
  const { distribution, loading, error, fetchDistribution, resetDistribution } = useAgeDistribution();
  useEffect(() => {
    if (open) {
      fetchDistribution();
    } else {
      resetDistribution();
    }
  }, [open]);
  const totalUsers = distribution.reduce((sum, item) => sum + item.count, 0);
  const getColor = (ageRange) => {
    const colors = {
      "15-30": "#3b82f6",
      // blue
      "31-45": "#10b981",
      // green
      "46-60": "#f59e0b",
      // orange
      "61+": "#ef4444"
      // red
    };
    return colors[ageRange] || "#6b7280";
  };
  const handleClose = () => {
    resetDistribution();
    onClose();
  };
  return /* @__PURE__ */ jsx(
    Modal,
    {
      title: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(BarChartOutlined, { className: "text-blue-500 text-xl" }),
        /* @__PURE__ */ jsx("span", { children: "Age Distribution" })
      ] }),
      open,
      onCancel: handleClose,
      footer: null,
      width: 600,
      children: /* @__PURE__ */ jsxs("div", { className: "py-4", children: [
        loading && /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center py-12", children: /* @__PURE__ */ jsx(Spin, { size: "large", tip: "Loading distribution..." }) }),
        error && !loading && /* @__PURE__ */ jsx(
          Alert,
          {
            message: "Error",
            description: error,
            type: "error",
            showIcon: true,
            className: "mb-4"
          }
        ),
        !loading && !error && distribution.length === 0 && /* @__PURE__ */ jsx(
          Empty,
          {
            description: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-slate-500", children: "No data available" }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-sm mt-1", children: "No users found in the system" })
            ] }),
            className: "py-8"
          }
        ),
        !loading && !error && distribution.length > 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 rounded-lg p-4 text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-blue-600 font-medium mb-1", children: "Total Users" }),
            /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-blue-700", children: totalUsers })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-4", children: distribution.map((item, index) => {
            const percentage = (item.count / totalUsers * 100).toFixed(1);
            const color = getColor(item.age_range);
            return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(UserOutlined, { style: { color } }),
                  /* @__PURE__ */ jsxs("span", { className: "font-semibold text-slate-800", children: [
                    item.age_range,
                    " years"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxs("span", { className: "text-sm text-slate-600", children: [
                    item.count,
                    " user",
                    item.count !== 1 ? "s" : ""
                  ] }),
                  /* @__PURE__ */ jsxs("span", { className: "text-sm font-semibold text-slate-700", children: [
                    percentage,
                    "%"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                Progress,
                {
                  percent: parseFloat(percentage),
                  strokeColor: color,
                  showInfo: false,
                  strokeWidth: 12
                }
              )
            ] }, index);
          }) }),
          /* @__PURE__ */ jsx("div", { className: "pt-4 border-t border-slate-200", children: /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 text-center", children: "Distribution shows the number of users in each age range" }) })
        ] })
      ] })
    }
  );
}
function UsersSearch({ onSearch, onFilterChange, filters }) {
  const [isPairsModalOpen, setIsPairsModalOpen] = useState(false);
  const [isDistributionModalOpen, setIsDistributionModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(filters.search || "");
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(searchValue);
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchValue]);
  const showPairsModal = () => {
    setIsPairsModalOpen(true);
  };
  const handleClosePairsModal = () => {
    setIsPairsModalOpen(false);
  };
  const showDistributionModal = () => {
    setIsDistributionModalOpen(true);
  };
  const handleCloseDistributionModal = () => {
    setIsDistributionModalOpen(false);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "bg-white p-4 rounded-lg shadow mb-4", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-slate-700 mb-2", children: "Search Users" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            placeholder: "Search by name or email...",
            allowClear: true,
            size: "large",
            prefix: /* @__PURE__ */ jsx(SearchOutlined, {}),
            value: searchValue,
            onChange: (e) => setSearchValue(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-slate-700 mb-2", children: "Filter by User Type" }),
        /* @__PURE__ */ jsxs(
          Select,
          {
            placeholder: "All Users",
            size: "large",
            allowClear: true,
            className: "w-full",
            onChange: onFilterChange,
            defaultValue: filters.user_type,
            children: [
              /* @__PURE__ */ jsx(Select.Option, { value: "CUSTOMER", children: "Customers" }),
              /* @__PURE__ */ jsx(Select.Option, { value: "GUARD", children: "Security Guards" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-slate-700 mb-2", children: "Age Analysis" }),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "default",
            size: "large",
            icon: /* @__PURE__ */ jsx(TeamOutlined, {}),
            onClick: showPairsModal,
            className: "w-full",
            children: "Find Pairs"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-slate-700 mb-2", children: "Statistics" }),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "default",
            size: "large",
            icon: /* @__PURE__ */ jsx(BarChartOutlined, {}),
            onClick: showDistributionModal,
            className: "w-full",
            children: "Age Distribution"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(
      UserPairsModal,
      {
        open: isPairsModalOpen,
        onClose: handleClosePairsModal
      }
    ),
    /* @__PURE__ */ jsx(
      AgeDistributionModal,
      {
        open: isDistributionModalOpen,
        onClose: handleCloseDistributionModal
      }
    )
  ] });
}
function DeleteUserModal({ user, open, onClose }) {
  const [api, contextHolder] = notification.useNotification();
  const handleDelete = () => {
    router.delete(`/admin/users/delete/${user.id}`, {
      onSuccess: () => {
        api.success({
          message: "User Deleted",
          description: `${user.name} has been successfully deleted.`,
          placement: "topRight"
        });
        onClose();
      },
      onError: (errors) => {
        api.error({
          message: "Deletion Failed",
          description: errors.message || "Failed to delete user. Please try again.",
          placement: "topRight"
        });
      }
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    contextHolder,
    /* @__PURE__ */ jsx(
      Modal,
      {
        title: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(ExclamationCircleOutlined, { className: "text-red-500 text-xl" }),
          /* @__PURE__ */ jsx("span", { children: "Delete User" })
        ] }),
        open,
        onOk: handleDelete,
        onCancel: onClose,
        okText: "Delete",
        okType: "danger",
        cancelText: "Cancel",
        okButtonProps: {
          size: "large"
        },
        cancelButtonProps: {
          size: "large"
        },
        children: /* @__PURE__ */ jsxs("div", { className: "py-4", children: [
          /* @__PURE__ */ jsx("p", { className: "text-slate-700 mb-4", children: "Are you sure you want to delete this user?" }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 bg-slate-50 rounded-lg mb-4", children: [
            /* @__PURE__ */ jsxs("p", { className: "text-sm mb-2", children: [
              /* @__PURE__ */ jsx("strong", { className: "text-slate-700", children: "Name:" }),
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-slate-600", children: user?.name })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
              /* @__PURE__ */ jsx("strong", { className: "text-slate-700", children: "Email:" }),
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-slate-600", children: user?.email })
            ] })
          ] })
        ] })
      }
    )
  ] });
}
function UsersTable({ users, loading, pagination, onPageChange }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
    onPageChange();
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 60,
      fixed: "left",
      render: (id) => /* @__PURE__ */ jsxs("span", { className: "font-mono text-slate-600 text-xs", children: [
        "#",
        id
      ] })
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      ellipsis: true,
      render: (name) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(UserOutlined, { className: "text-blue-500 flex-shrink-0" }),
        /* @__PURE__ */ jsx("span", { className: "font-medium text-slate-800 text-sm truncate", children: name })
      ] })
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
      render: (email) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(MailOutlined, { className: "text-slate-400 flex-shrink-0" }),
        /* @__PURE__ */ jsx("span", { className: "text-slate-600 text-sm truncate", children: email })
      ] })
    },
    {
      title: "Type",
      dataIndex: "user_type",
      key: "user_type",
      render: (type) => {
        const color = type === "CUSTOMER" ? "blue" : "green";
        const text = type === "CUSTOMER" ? "Customer" : "Guard";
        return /* @__PURE__ */ jsx(Tag, { color, className: "text-xs", children: text });
      }
    },
    {
      title: "Birth Date",
      dataIndex: "date_of_birth",
      key: "date_of_birth",
      render: (date) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(CalendarOutlined, { className: "text-slate-400 flex-shrink-0" }),
        /* @__PURE__ */ jsx("span", { className: "text-slate-600 text-sm", children: date })
      ] })
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: 60,
      render: (age) => /* @__PURE__ */ jsx("span", { className: "font-semibold text-slate-700 text-sm", children: age })
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      fixed: "right",
      render: (_, record) => /* @__PURE__ */ jsx(
        Button,
        {
          type: "text",
          danger: true,
          size: "small",
          icon: /* @__PURE__ */ jsx(DeleteOutlined, {}),
          onClick: () => handleDeleteClick(record),
          className: "hover:bg-red-50",
          children: "Delete"
        }
      )
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsx(
      Table,
      {
        columns,
        dataSource: users,
        loading,
        rowKey: "id",
        scroll: { x: 600, y: "calc(100vh - 400px)" },
        size: "small",
        sticky: true,
        pagination: {
          current: pagination.current_page,
          total: pagination.total,
          pageSize: pagination.per_page,
          showSizeChanger: false,
          showTotal: (total, range) => /* @__PURE__ */ jsx("span", { className: "text-sm", children: `${range[0]}-${range[1]} of ${total}` }),
          onChange: onPageChange,
          responsive: true,
          simple: window.innerWidth < 640
        },
        locale: {
          emptyText: /* @__PURE__ */ jsxs("div", { className: "py-8", children: [
            /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-base", children: "No users found" }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-xs mt-2", children: "Try adjusting your search or filter" })
          ] })
        }
      }
    ) }) }),
    selectedUser && /* @__PURE__ */ jsx(
      DeleteUserModal,
      {
        user: selectedUser,
        open: isDeleteModalOpen,
        onClose: handleCloseDeleteModal
      }
    )
  ] });
}
function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 15,
    total: 0
  });
  const [filters, setFilters] = useState({
    search: "",
    user_type: void 0
  });
  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      const params = {
        page,
        ...filters.search && { search: filters.search },
        ...filters.user_type && { user_type: filters.user_type }
      };
      const response = await axios.get("/api/users", { params });
      setUsers(response.data.data);
      setPagination({
        current_page: response.data.meta.current_page,
        per_page: response.data.meta.per_page,
        total: response.data.meta.total
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers(1);
  }, [filters]);
  const handleSearch = (value) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };
  const handleFilterChange = (value) => {
    setFilters((prev) => ({ ...prev, user_type: value }));
  };
  const handlePageChange = (page) => {
    fetchUsers(page);
  };
  const refreshUsers = () => {
    fetchUsers(pagination.current_page);
  };
  return {
    users,
    loading,
    pagination,
    filters,
    handleSearch,
    handleFilterChange,
    handlePageChange,
    refreshUsers
  };
}
function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    users,
    loading,
    pagination,
    filters,
    handleSearch,
    handleFilterChange,
    handlePageChange,
    refreshUsers
  } = useUsers();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    refreshUsers();
  };
  return /* @__PURE__ */ jsxs(AuthLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Users" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center m-0 flex-col sm:flex-row gap-4", children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-slate-800", children: "Users Management" }) }),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "primary",
            size: "large",
            icon: /* @__PURE__ */ jsx(PlusOutlined, {}),
            onClick: showModal,
            children: "Create New User"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        UsersSearch,
        {
          onSearch: handleSearch,
          onFilterChange: handleFilterChange,
          filters
        }
      ),
      /* @__PURE__ */ jsx(
        UsersTable,
        {
          users,
          loading,
          pagination,
          onPageChange: handlePageChange
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      CreateUserModal,
      {
        open: isModalOpen,
        onClose: handleCloseModal
      }
    )
  ] });
}
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Users
}, Symbol.toStringTag, { value: "Module" }));
createServer(
  (page) => createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./Pages/Auth/Login.jsx": __vite_glob_0_0, "./Pages/Dashboard/Index.jsx": __vite_glob_0_1, "./Pages/Dashboard/Settings.jsx": __vite_glob_0_2, "./Pages/Dashboard/Users.jsx": __vite_glob_0_3 });
      return pages[`./Pages/${name}.jsx`];
    },
    setup: ({ App, props }) => /* @__PURE__ */ jsx(App, { ...props })
  })
);
