# vscode-copybara

用于 [Copybara](https://github.com/google/copybara) 的 VSCode 扩展 - 一个用于在代码仓库之间转换和移动代码的工具。

本扩展为 Copybara 配置文件（`.sky` 文件）提供语法高亮、代码片段和智能提示支持。

## 功能特性

- **语法高亮** - 支持 Copybara `.sky` 文件的语法着色
- **智能提示** - 提供常用 Copybara 配置的代码片段
- **自动补全** - 支持 Copybara API 函数和模块：
  - `core.*` - 核心工作流和转换函数
  - `git.*` - Git 源和目标配置
  - `metadata.*` - 提交信息和作者信息操作
  - `authoring.*` - 作者映射策略
  - `patch.*`、`buildozer.*` 等更多模块
- **快速模板** - 提供工作流、转换和迁移的快速模板
- 基于 Starlark 语言语法：
  - 注释（`#`）
  - 括号匹配和自动闭合
  - 字符串和数字字面量
  - 函数定义和调用

![截图](./media/screenshot.png)

## 安装

1. 从 VSCode 市场安装（搜索 "Copybara"）
   [vscode-copybara](https://marketplace.visualstudio.com/items?itemName=WindLi.vscode-copybara)
2. 或者从 VSIX 文件安装
3. 打开任意 `.sky` 文件即可激活扩展

## 支持的文件类型

- `.sky` - Copybara 配置文件
- `copy.bara.sky` - 标准 Copybara 配置文件名

## 使用方法

### 代码片段

扩展提供了用于快速编写 Copybara 配置的代码片段。开始输入并从建议中选择：

- `core.workflow` - 创建完整的工作流
- `git.origin` - 定义 Git 源
- `git.destination` - 定义 Git 目标
- `core.replace` - 替换文本转换
- `core.move` - 移动文件转换
- `metadata.squash_notes` - 合并提交信息
- `authoring.pass_thru` - 透传作者信息
- 以及更多...

### 示例

创建一个新的 `copy.bara.sky` 文件，开始输入 `core.workflow`，然后按 Tab 键插入完整的工作流模板：

```copybara
core.workflow(
    name = "default",
    origin = git.origin(
        url = "https://github.com/example/source.git",
        ref = "main",
    ),
    destination = git.destination(
        url = "https://github.com/example/dest.git",
        fetch = "main",
        push = "main",
    ),
    transformations = [
        core.move("src/", ""),
    ],
    authoring = authoring.pass_thru(default = "Copybara <copybara@example.com>"),
    mode = "SQUASH",
)
```

## 相关资源

- [Copybara 官方文档](https://github.com/google/copybara)
- [Copybara 参考指南](https://github.com/google/copybara/blob/master/docs/reference.md)
- [配置示例](https://github.com/google/copybara/tree/master/docs/examples.md)
- [vscode-copybara 市场页面](https://marketplace.visualstudio.com/items?itemName=WindLi.vscode-copybara)

## 贡献

欢迎贡献！请随时提交 Pull Request。

## 许可证

Apache-2.0
