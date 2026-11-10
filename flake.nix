{
  description = "Expo / React Native dev shell with a Nix-built Android SDK";

  inputs.nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";

  outputs = { nixpkgs, ... }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs {
        inherit system;
        config = {
          allowUnfree = true;
          android_sdk.accept_license = true;
        };
      };

      # EDIT THESE: they must match what your project asks for.
      # Find them with:
      #   grep -E "minSdk|targetSdk|compileSdk|buildTools|ndk" \
      #     node_modules/react-native/gradle/libs.versions.toml android/build.gradle
      platformVersion = "37.0";
      buildToolsVersion = "37.0.0";
      # AGP asks for 36.0.0 as its own default for some modules, so keep it too.
      extraBuildTools = [ "36.0.0" ];
      ndkVersion = "27.1.12297006";
      cmakeVersions = [ "3.22.1" "3.31.6" ];
      emulatorApi = "36";

      android = pkgs.androidenv.composeAndroidPackages {
        # 37.0 is needed to compile; 36 (the project's targetSdk) gives the
        # emulator image. System images are installed per platform version.
        platformVersions = [ platformVersion emulatorApi ];
        buildToolsVersions = [ buildToolsVersion ] ++ extraBuildTools;
        includeNDK = true;
        ndkVersions = [ ndkVersion ];
        cmakeVersions = cmakeVersions;
        includeEmulator = true;
        includeSystemImages = true;
        systemImageTypes = [ "google_apis" ];
        abiVersions = [ "x86_64" ];
      };

      sdkRoot = "${android.androidsdk}/libexec/android-sdk";
    in {
      devShells.${system}.default = pkgs.mkShell {
        # nodejs is deliberately not listed: the one from modules/dev.nix is used.
        packages = [ pkgs.jdk17 android.androidsdk ];

        ANDROID_HOME = sdkRoot;
        ANDROID_SDK_ROOT = sdkRoot;
        JAVA_HOME = pkgs.jdk17.home;

        # Stop Gradle from downloading its own aapt2, which cannot run on NixOS.
        GRADLE_OPTS = "-Dorg.gradle.project.android.aapt2FromMavenOverride=${sdkRoot}/build-tools/${buildToolsVersion}/aapt2";

        # Keep AVDs from this SDK separate from the ones Android Studio makes
        # (those point at system images inside ~/Android/Sdk).
        shellHook = ''
          export ANDROID_AVD_HOME="$HOME/.android/avd-nix"
          mkdir -p "$ANDROID_AVD_HOME"
        '';
      };
    };
}
