{
	"login": {
      "login": "登录",
      "forgot": "忘记密码？"
    },
    "common":{
    	"add": "添加",
    	"update": "修改",
    	"delete": "删除",
    	"save": "保存",
    	"cancel": "取消",
    	"reset": "重置",
    	"select": "-请选择-",
    	"search": "搜索",
        "company": "公司"
    },
    "user": {
    	"title": "用户",
    	"name": "姓名",
    	"username": "用户名",
    	"company": "公司",
    	"phone": "手机号",
    	"email": "邮箱",
    	"password": "密码",
    	"info": "用户详情"
    },
    "role": {
        "title": "角色",
        "name": "名称",
        "info": "角色详情"
    },
    "permission": {
        "title": "权限",
        "expand": "展开全部",
        "collapse": "收缩全部",
        "name": "名称",
        "key": "权限字"
    },
    "device": {
        "title": "设备",
        "name": "名称",
        "sn": "序列号",
        "model": "型号",
        "patrol_version": "采集版本",
        "cloud_version": "云平台版本",
        "hard_version": "硬件版本",
        "status": "状态",
        "last_time": "最后操作时间",
        "create_time": "创建时间",
        "upgrade_time": "最后升级时间",
        "online": "在线",
        "offline": "离线"
    },
    "template": {
      "host": "服务器",
      "port": "端口",
      "interval": "数据间隔",
      "watch_interval": "监视间隔",
      "heart_interval": "心跳间隔",
      "timeout": "超时时间",
      "device": "设备",
      "sn": "序列号",
      "address": "地址",
      "data": "数据项",
      "id": "数据标识",
      "name": "数据名称",
      "modbus": "Modbus配置",
      "command": "命令",
      "register": "寄存器",
      "length": "长度",
      "method": "解析方式",
      "ratio": "倍率",
      "add_data": "添加数据项",
      "add_device": "添加设备",
      "watch": "监视",
      "add_watch": "添加监视",
      "manual_input": "手动输入",
      "select_point": "从模板中选择",
      "tip": {
        "modify": "修改采集模板",
        "upload": "将采集模板上传到设备上",
        "download": "从设备上下载当前正在使用的模板",
        "host": "MQTT服务器的域名或IP",
        "port": "MQTT服务器的端口",
        "interval": "发送实时数据的时间间隔，设置为0不发送，单位：秒",
        "watch_interval": "检测数据变化的时间间隔，设置为0不检测，单位：秒",
        "heart_interval": "发送心跳数据的时间间隔，设置为0不发送，单位：秒",
        "timeout": "在没有数据交互时，保持连接的时间，单位：秒",
        "sn": "被采集的设备的序列号",
        "address": "被采集设备的Modbus地址",
        "save_device": "把当前的设备保存为模板，供下次使用",
        "delete_device": "删除当前的设备",
        "id": "数据项的唯一标识",
        "name": "数据项的名称",
        "command": "查询寄存器使用的命令",
        "register": "寄存器的地址",
        "length": "查询的数据长度",
        "method": "多个数据的计算方式，设置为0先高后低，设置为1先低后高。2为先高后低(无符号)，3为先低后高(无符号)",
        "ratio": "数据的倍率，如果设置为1000，数据将会除以1000",
        "delete_property": "删除当前数据项"
      }
    },
    "realdata": {
      "title": "实时数据",
      "tip": "查看实时数据"
    },
    "heart_data": {
    	"title": "心跳数据",
    	"time": "时间"
    },
    "admin": {
      "start": "启动",
      "stop": "停止",
      "restart": "重新启动",
      "test": "测试",
      "executor": "执行器"
    },
    "company": {
        "title": "公司",
        "name": "名称",
        "info": "公司详情"
    },
    "header":{
        "navbar":{
            "UPLOAD":"Upload",
            "new":{
                "NEW":"New",
                "PROJECT":"Projects",
                "TASK":"Task",
                "USER":"User",
                "EMAIL":"Email"
            },
            "NOTIFICATIONS":"Notifications"
        }
    },
    "aside":{
        "nav":{
            "HEADER":"Navigation",
            "DASHBOARD":"仪表盘",
            "CALENDAR":"Calendar",
            "EMAIL":"Email",
            "WIDGETS":"Widgets",
            "system":{
                "system":"系统管理",
                "user":"用户管理",
                "role":"角色管理",
                "permission":"权限管理",
                "device":"设备管理",
                "company": "公司管理"
            },
            "components":{
                "COMPONENTS":"Components",
                "ui_kits":{
                    "UI_KITS":"UI Kits",
                    "BUTTONS":"Buttons",
                    "ICONS":"Icons",
                    "GRID":"Grid",
                    "BOOTSTRAP":"Bootstrap",
                    "SORTABLE":"Sortable",
                    "PORTLET":"Portlet",
                    "TIMELINE":"Timeline",
                    "VECTOR_MAP":"Vector Map"
                },
                "table":{
                    "TABLE":"Table",
                    "TABLE_STATIC":"Table static",
                    "DATATABLE":"Datatable",
                    "FOOTABLE":"Footable"
                },
                "form":{
                    "FORM":"Form",
                    "FORM_ELEMENTS":"Form elements",
                    "FORM_VALIDATION":"Form validation",
                    "FORM_WIZARD":"Form wizard"
                },
                "CHART":"Chart",
                "pages":{
                    "404":"404",
                    "PAGES":"Pages",
                    "PROFILE":"Profile",
                    "POST":"Post",
                    "SEARCH":"Search",
                    "INVOICE":"Invoice",
                    "LOCK_SCREEN":"Lock screen",
                    "SIGNIN":"Signin",
                    "SIGNUP":"Signup",
                    "FORGOT_PASSWORD":"Forgot password"
                }
            },
            "your_stuff":{
                "YOUR_STUFF":"Your Stuff",
                "PROFILE":"Profile",
                "DOCUMENTS":"Documents"
            }
        },
        "MILESTONE":"Milestone",
        "RELEASE":"Release"
    }
}