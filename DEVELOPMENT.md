# 个人主页生成说明

个人主页仓库只保存个人配置和生成产物，SVG 生成能力由 [Profile Lab](https://github.com/Jian1202/profile-lab) 提供。

## 环境准备

- Node.js 20 或更高版本
- 将两个仓库放在同一目录下

```text
GitHub/
  Jian1202-profile/
  profile-lab/
```

以下命令均在 `Jian1202-profile` 目录执行。首次使用前，先在相邻的 `profile-lab` 目录中运行 `npm ci`。

## PowerShell

校验配置：

```powershell
node ..\profile-lab\bin\profile-lab.js validate `
  --config .\profile.yaml
```

生成个人主页：

```powershell
node ..\profile-lab\bin\profile-lab.js generate `
  --config .\profile.yaml `
  --output .\assets\profile.svg
```

启动本地预览：

```powershell
node ..\profile-lab\bin\profile-lab.js preview `
  --config .\profile.yaml `
  --output .\assets\profile.svg `
  --port 4173
```

预览地址为 <http://127.0.0.1:4173/>。

## CMD

校验配置：

```bat
node ..\profile-lab\bin\profile-lab.js validate ^
  --config .\profile.yaml
```

生成个人主页：

```bat
node ..\profile-lab\bin\profile-lab.js generate ^
  --config .\profile.yaml ^
  --output .\assets\profile.svg
```

启动本地预览：

```bat
node ..\profile-lab\bin\profile-lab.js preview ^
  --config .\profile.yaml ^
  --output .\assets\profile.svg ^
  --port 4173
```

## 自动生成

`.github/workflows/update-profile.yml` 会在以下情况运行：

- 手动触发工作流
- `profile.yaml` 发生变化
- 生成工作流自身发生变化

工作流固定使用 Profile Lab `v0.1.0` 对应的完整 commit SHA。生成结果没有变化时不会创建提交，也不会监听 `assets/profile.svg`，因此不会形成提交循环。

升级 Profile Lab 时，需要显式更新工作流中的固定版本，并重新完成配置校验、SVG 哈希比较、视觉确认和 Actions 验证。
