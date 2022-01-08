//
//  RNQrCodeModule.swift
//  RNQrCodeModule
//
//  Copyright © 2021 Tomei Alexandru. All rights reserved.
//

import Foundation

@objc(RNQrCodeModule)
class RNQrCodeModule: NSObject {
  @objc
  func constantsToExport() -> [AnyHashable : Any]! {
    return ["count": 1]
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
