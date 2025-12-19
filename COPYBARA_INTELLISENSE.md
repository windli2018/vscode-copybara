# Copybara IntelliSense 功能说明

本扩展现已提供完整的 Copybara IntelliSense 支持,包括代码片段和智能提示。

## 功能特性

### 1. 代码片段 (Code Snippets)

在 `.sky` 文件中输入以下前缀,按 Tab 键即可插入完整模板:

#### 核心模块 (core)
- `core.workflow` - 完整的工作流配置
- `core.move` - 文件移动转换
- `core.copy` - 文件复制转换
- `core.replace` - 文本替换转换
- `core.remove` - 文件删除转换
- `core.transform` - 转换组合
- `core.feedback` - 反馈迁移
- `core.filter_replace` - 正则过滤替换
- `core.verify_match` - 验证文件匹配

#### Git 模块 (git)
- `git.origin` - Git 源定义
- `git.destination` - Git 目标定义
- `git.github_origin` - GitHub 源定义
- `git.github_pr_origin` - GitHub PR 源定义
- `git.mirror` - Git 镜像迁移
- `git.github_api` - GitHub API 对象
- `git.gerrit_api` - Gerrit API 对象

#### 元数据模块 (metadata)
- `metadata.squash_notes` - 合并提交信息
- `metadata.map_author` - 映射作者
- `metadata.add_header` - 添加提交头部
- `metadata.expose_label` - 暴露标签

#### 授权模块 (authoring)
- `authoring.pass_thru` - 透传作者
- `authoring.overwrite` - 覆盖作者
- `authoring.allowed` - 允许特定作者

#### 其他模块
- `patch.apply` - 应用补丁
- `buildozer.modify` - 修改 BUILD 文件
- `glob` - Glob 模式
- `console.info` - 控制台输出
- `def transform` - 自定义转换函数模板

### 2. TypeScript 类型定义

位于 `types/copybara.d.ts` 的类型定义文件提供了:
- Copybara API 的完整类型声明
- 参数说明和类型检查
- 函数签名和返回类型

### 3. 使用示例

#### 创建基本工作流

1. 创建新文件 `copy.bara.sky`
2. 输入 `core.workflow` 并按 Tab
3. 填写参数值

```copybara
core.workflow(
    name = "default",
    origin = git.origin(
        url = "https://github.com/source/repo.git",
        ref = "main",
    ),
    destination = git.destination(
        url = "https://github.com/dest/repo.git",
        fetch = "main",
        push = "main",
    ),
    transformations = [
        core.move("src/", ""),
    ],
    authoring = authoring.pass_thru(default = "Bot <bot@example.com>"),
    mode = "SQUASH",
)
```

#### 添加转换

输入 `core.replace` 并按 Tab:

```copybara
core.replace(
    before = "old_package",
    after = "new_package",
)
```

#### 自定义转换函数

输入 `def transform` 并按 Tab:

```copybara
def custom_transform(ctx):
    """Custom transformation function"""
    files = ctx.list()
    
    for file in files:
        content = ctx.read_path(file)
        # Process content
        ctx.write_path(file, content)
    
    return ctx.success()
```

## 支持的 Copybara 对象

基于 `copybara.sky.reference.md` 文档,本扩展支持以下对象和模块的智能提示。

所有 Copybara 配置文件使用 Starlark 语法(Python-like 语法)。

### 主要模块
- `core` - 核心迁移和转换功能
- `git` - Git 版本控制操作
- `metadata` - 提交信息和作者处理
- `authoring` - 作者映射配置
- `patch` - 补丁文件操作
- `buildozer` - BUILD 文件操作
- `console` - 日志输出
- `archive` - 归档文件操作
- `http` - HTTP 请求
- `re2` - 正则表达式

### 对象类型
- `Origin` - 源配置
- `Destination` - 目标配置
- `Transformation` - 转换操作
- `Authoring` - 授权配置
- `TransformWork` - 转换上下文
- `Path` - 路径对象
- `Glob` - 文件匹配模式

## 提示

- 使用 Ctrl+Space (Windows/Linux) 或 Cmd+Space (Mac) 触发自动补全
- 片段支持 Tab 键在占位符之间跳转
- 查看 `copybara.sky.reference.md` 获取完整 API 文档
